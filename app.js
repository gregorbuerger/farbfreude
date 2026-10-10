(() => {
  "use strict";

  // ===== State =====
  let currentLevel = null;
  let filled = null;          // 2D array of booleans
  let selectedColor = 1;
  let cellSize = 24;
  let completedLevels = JSON.parse(localStorage.getItem("happycolor_done") || "[]");

  // ===== DOM =====
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const levelGrid = document.getElementById("level-grid");
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const paletteEl = document.getElementById("palette");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const completeOverlay = document.getElementById("complete-overlay");
  const canvasContainer = document.getElementById("canvas-container");

  // ===== Init =====
  function init() {
    renderLevelCards();
    document.getElementById("btn-back").addEventListener("click", goHome);
    document.getElementById("btn-hint").addEventListener("click", showHint);
    document.getElementById("btn-next").addEventListener("click", nextLevel);
    document.getElementById("btn-home").addEventListener("click", goHome);
    canvas.addEventListener("pointerdown", onCanvasPointer);
    canvas.addEventListener("pointermove", onCanvasPointer);
  }

  // ===== Start Screen =====
  function renderLevelCards() {
    levelGrid.innerHTML = "";
    LEVELS.forEach((level, idx) => {
      const card = document.createElement("div");
      card.className = "level-card" + (completedLevels.includes(level.id) ? " completed" : "");
      card.innerHTML = `
        <div class="level-thumb"><canvas width="80" height="80"></canvas></div>
        <div class="level-name">${level.name}</div>
        <div class="level-status">${completedLevels.includes(level.id) ? "✅ Fertig" : "▶ Spielen"}</div>
      `;
      const thumbCanvas = card.querySelector("canvas");
      drawPreview(thumbCanvas, level);
      card.addEventListener("click", () => startLevel(idx));
      levelGrid.appendChild(card);
    });
  }

  function drawPreview(c, level) {
    const tctx = c.getContext("2d");
    const s = Math.floor(80 / level.size);
    for (let y = 0; y < level.size; y++) {
      for (let x = 0; x < level.size; x++) {
        const n = level.grid[y][x];
        if (n === 0) continue;
        tctx.fillStyle = level.colors[n];
        tctx.fillRect(x * s, y * s, s, s);
      }
    }
  }

  // ===== Game =====
  function startLevel(index) {
    currentLevel = LEVELS[index];
    const size = currentLevel.size;
    filled = Array.from({ length: size }, () => Array(size).fill(false));

    // restore progress if any
    const saved = localStorage.getItem("happycolor_" + currentLevel.id);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        filled = data.filled;
      } catch (e) {}
    }

    selectedColor = firstIncompleteColor();
    calcCellSize();
    draw();
    buildPalette();
    updateProgress();

    startScreen.classList.remove("active");
    gameScreen.classList.add("active");
    completeOverlay.classList.add("hidden");
  }

  function calcCellSize() {
    const maxW = canvasContainer.clientWidth - 24;
    const maxH = canvasContainer.clientHeight - 24;
    const size = currentLevel.size;
    cellSize = Math.floor(Math.min(maxW / size, maxH / size));
    cellSize = Math.max(cellSize, 12);
    canvas.width = size * cellSize;
    canvas.height = size * cellSize;
  }

  function draw() {
    const size = currentLevel.size;
    const colors = currentLevel.colors;
    const grid = currentLevel.grid;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = "#0f0f1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const n = grid[y][x];
        if (n === 0) continue;

        const px = x * cellSize;
        const py = y * cellSize;

        if (filled[y][x]) {
          ctx.fillStyle = colors[n];
          ctx.fillRect(px, py, cellSize, cellSize);
        } else {
          // unfilled: light gray with number
          ctx.fillStyle = "#2a2a3d";
          ctx.fillRect(px, py, cellSize, cellSize);

          // subtle border
          ctx.strokeStyle = "#3a3a50";
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

          // number
          if (cellSize >= 16) {
            ctx.fillStyle = "#888";
            ctx.font = `bold ${Math.floor(cellSize * 0.45)}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(String(n), px + cellSize / 2, py + cellSize / 2);
          }
        }
      }
    }
  }

  function buildPalette() {
    paletteEl.innerHTML = "";
    const colors = currentLevel.colors;
    for (let i = 1; i < colors.length; i++) {
      const btn = document.createElement("button");
      btn.className = "color-btn";
      btn.style.background = colors[i];
      btn.dataset.num = i;
      btn.textContent = i;

      if (isColorComplete(i)) {
        btn.classList.add("done");
        btn.innerHTML = `<span class="check">✓</span>${i}`;
      }
      if (i === selectedColor) btn.classList.add("selected");

      btn.addEventListener("click", () => {
        selectedColor = i;
        document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      paletteEl.appendChild(btn);
    }
  }

  function isColorComplete(num) {
    const size = currentLevel.size;
    const grid = currentLevel.grid;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] === num && !filled[y][x]) return false;
      }
    }
    return true;
  }

  function firstIncompleteColor() {
    for (let i = 1; i < currentLevel.colors.length; i++) {
      if (!isColorComplete(i)) return i;
    }
    return 1;
  }

  function onCanvasPointer(e) {
    if (e.buttons === 0 && e.type === "pointermove") return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / cellSize);

    fillCell(x, y);
  }

  function fillCell(x, y) {
    if (!currentLevel) return;
    const size = currentLevel.size;
    if (x < 0 || y < 0 || x >= size || y >= size) return;

    const n = currentLevel.grid[y][x];
    if (n === 0 || filled[y][x]) return;
    if (n !== selectedColor) return; // only fill matching number

    filled[y][x] = true;
    draw();
    updateProgress();
    saveProgress();

    // auto-advance color when done
    if (isColorComplete(selectedColor)) {
      buildPalette();
      const next = firstIncompleteColor();
      if (next !== selectedColor) {
        selectedColor = next;
        buildPalette();
      }
    }

    if (isLevelComplete()) {
      onLevelComplete();
    }
  }

  function updateProgress() {
    const size = currentLevel.size;
    const grid = currentLevel.grid;
    let total = 0, done = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] !== 0) {
          total++;
          if (filled[y][x]) done++;
        }
      }
    }
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressFill.style.width = pct + "%";
    progressText.textContent = pct + "%";
  }

  function isLevelComplete() {
    const size = currentLevel.size;
    const grid = currentLevel.grid;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] !== 0 && !filled[y][x]) return false;
      }
    }
    return true;
  }

  function onLevelComplete() {
    if (!completedLevels.includes(currentLevel.id)) {
      completedLevels.push(currentLevel.id);
      localStorage.setItem("happycolor_done", JSON.stringify(completedLevels));
    }
    localStorage.removeItem("happycolor_" + currentLevel.id);
    completeOverlay.classList.remove("hidden");
  }

  function saveProgress() {
    localStorage.setItem("happycolor_" + currentLevel.id, JSON.stringify({ filled }));
  }

  function showHint() {
    // flash one unfilled cell of the selected color
    const size = currentLevel.size;
    const grid = currentLevel.grid;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] === selectedColor && !filled[y][x]) {
          // temporary highlight
          const px = x * cellSize;
          const py = y * cellSize;
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.fillRect(px, py, cellSize, cellSize);
          setTimeout(() => draw(), 400);
          return;
        }
      }
    }
  }

  function nextLevel() {
    const idx = LEVELS.findIndex(l => l.id === currentLevel.id);
    const next = (idx + 1) % LEVELS.length;
    startLevel(next);
  }

  function goHome() {
    renderLevelCards();
    gameScreen.classList.remove("active");
    startScreen.classList.add("active");
    completeOverlay.classList.add("hidden");
  }

  // handle resize
  window.addEventListener("resize", () => {
    if (currentLevel && gameScreen.classList.contains("active")) {
      calcCellSize();
      draw();
    }
  });

  init();
})();
