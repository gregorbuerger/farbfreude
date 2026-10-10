(() => {
  "use strict";

  let currentLevel = null;
  let selectedColor = 1;
  let completedLevels = JSON.parse(localStorage.getItem("happycolor_done") || "[]");
  let regionState = {};

  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const levelGrid = document.getElementById("level-grid");
  const svgWrap = document.getElementById("svg-wrap");
  const paletteEl = document.getElementById("palette");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const completeOverlay = document.getElementById("complete-overlay");

  function init() {
    renderLevelCards();
    document.getElementById("btn-back").addEventListener("click", goHome);
    document.getElementById("btn-hint").addEventListener("click", showHint);
    document.getElementById("btn-next").addEventListener("click", nextLevel);
    document.getElementById("btn-home").addEventListener("click", goHome);
  }

  function renderLevelCards() {
    levelGrid.innerHTML = "";
    LEVELS.forEach((level, idx) => {
      const card = document.createElement("div");
      card.className = "level-card" + (completedLevels.includes(level.id) ? " completed" : "");
      card.innerHTML = `
        <div class="level-thumb"></div>
        <div class="level-name">${level.name}</div>
        <div class="level-status">${completedLevels.includes(level.id) ? "✅ Fertig" : "▶ Spielen"}</div>
      `;
      card.addEventListener("click", () => startLevel(idx));
      levelGrid.appendChild(card);

      const thumb = card.querySelector(".level-thumb");
      thumb.innerHTML = level.svg;
      thumb.querySelectorAll(".region").forEach(r => {
        const n = parseInt(r.getAttribute("data-n"), 10);
        if (n && level.colors[n]) r.setAttribute("fill", level.colors[n]);
      });
    });
  }

  function startLevel(index) {
    currentLevel = LEVELS[index];
    regionState = {};
    const saved = localStorage.getItem("happycolor_" + currentLevel.id);
    if (saved) {
      try { regionState = JSON.parse(saved).regions || {}; } catch (e) {}
    }
    selectedColor = 1;
    renderSvg();
    buildPalette();
    updateProgress();
    selectedColor = firstIncompleteColor();
    buildPalette();
    highlightActive();

    startScreen.classList.remove("active");
    gameScreen.classList.add("active");
    completeOverlay.classList.add("hidden");
  }

  function renderSvg() {
    svgWrap.innerHTML = currentLevel.svg;
    const svg = svgWrap.querySelector("svg");
    const regions = svg.querySelectorAll(".region");
    regions.forEach((el, idx) => {
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (!n) return;
      const key = String(idx);
      if (regionState[key]) {
        el.setAttribute("fill", currentLevel.colors[n]);
        el.classList.add("filled");
      } else {
        el.setAttribute("fill", "#f0ede8");
        el.classList.remove("filled");
      }
      el.style.cursor = "pointer";
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        fillRegion(el, idx, n);
      });
    });
    drawNumbers(svg);
  }

  function drawNumbers(svg) {
    svg.querySelectorAll(".num-label").forEach(n => n.remove());
    const regions = svg.querySelectorAll(".region");
    regions.forEach((el, idx) => {
      if (el.classList.contains("filled")) return;
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (!n) return;
      let bbox;
      try { bbox = el.getBBox(); } catch (e) { return; }
      if (bbox.width < 6 || bbox.height < 6) return;

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", bbox.x + bbox.width / 2);
      text.setAttribute("y", bbox.y + bbox.height / 2);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "central");
      text.setAttribute("class", "num-label");
      text.setAttribute("data-for", idx);
      text.setAttribute("fill", n === selectedColor ? "#222" : "#999");
      text.setAttribute("font-size", Math.min(14, Math.max(8, Math.min(bbox.width, bbox.height) * 0.4)));
      text.setAttribute("font-weight", "700");
      text.setAttribute("font-family", "sans-serif");
      text.setAttribute("pointer-events", "none");
      text.textContent = n;
      svg.appendChild(text);
    });
  }

  function fillRegion(el, idx, n) {
    if (n !== selectedColor) return;
    if (regionState[String(idx)]) return;

    regionState[String(idx)] = true;
    el.setAttribute("fill", currentLevel.colors[n]);
    el.classList.add("filled");

    const svg = svgWrap.querySelector("svg");
    const label = svg.querySelector(`.num-label[data-for="${idx}"]`);
    if (label) label.remove();

    saveProgress();
    updateProgress();
    buildPalette();

    if (isColorComplete(selectedColor)) {
      const next = firstIncompleteColor();
      if (next !== selectedColor && !isLevelComplete()) {
        selectedColor = next;
        buildPalette();
        highlightActive();
        drawNumbers(svg);
        highlightActive();
      }
    }
    if (isLevelComplete()) onLevelComplete();
  }

  function highlightActive() {
    const svg = svgWrap.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll(".num-label").forEach(t => {
      const forIdx = t.getAttribute("data-for");
      const region = svg.querySelectorAll(".region")[forIdx];
      if (!region) return;
      const n = parseInt(region.getAttribute("data-n"), 10);
      t.setAttribute("fill", n === selectedColor ? "#111" : "#aaa");
    });
    svg.querySelectorAll(".region").forEach(el => {
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (el.classList.contains("filled")) return;
      if (n === selectedColor) {
        el.setAttribute("stroke", currentLevel.colors[n] || "#333");
        el.setAttribute("stroke-width", "2.5");
      } else {
        el.setAttribute("stroke", "#333");
        el.setAttribute("stroke-width", "1.2");
      }
    });
  }

  function countRemaining(num) {
    const svg = svgWrap.querySelector("svg");
    if (!svg) return 0;
    let count = 0;
    svg.querySelectorAll(".region").forEach((el, idx) => {
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (n === num && !regionState[String(idx)]) count++;
    });
    return count;
  }

  function isColorComplete(num) { return countRemaining(num) === 0; }

  function firstIncompleteColor() {
    for (let i = 1; i < currentLevel.colors.length; i++) {
      if (!isColorComplete(i)) return i;
    }
    return 1;
  }

  function buildPalette() {
    paletteEl.innerHTML = "";
    for (let i = 1; i < currentLevel.colors.length; i++) {
      const remaining = countRemaining(i);
      const btn = document.createElement("button");
      btn.className = "color-btn";
      btn.style.background = currentLevel.colors[i];
      if (remaining === 0) {
        btn.classList.add("done");
        btn.innerHTML = `<span class="check">✓</span>`;
      } else {
        btn.innerHTML = `<span class="num">${i}</span><span class="remain">${remaining}</span>`;
      }
      if (i === selectedColor) btn.classList.add("selected");
      btn.addEventListener("click", () => {
        if (remaining === 0) return;
        selectedColor = i;
        buildPalette();
        const svg = svgWrap.querySelector("svg");
        drawNumbers(svg);
        highlightActive();
      });
      paletteEl.appendChild(btn);
    }
  }

  function updateProgress() {
    const svg = svgWrap.querySelector("svg");
    if (!svg) return;
    let total = 0, done = 0;
    svg.querySelectorAll(".region").forEach((el, idx) => {
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (!n) return;
      total++;
      if (regionState[String(idx)]) done++;
    });
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressFill.style.width = pct + "%";
    progressText.textContent = pct + "%";
  }

  function isLevelComplete() {
    const svg = svgWrap.querySelector("svg");
    if (!svg) return false;
    let all = true;
    svg.querySelectorAll(".region").forEach((el, idx) => {
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (n && !regionState[String(idx)]) all = false;
    });
    return all;
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
    localStorage.setItem("happycolor_" + currentLevel.id, JSON.stringify({ regions: regionState }));
  }

  function showHint() {
    const svg = svgWrap.querySelector("svg");
    if (!svg) return;
    const regions = svg.querySelectorAll(".region");
    for (let i = 0; i < regions.length; i++) {
      const el = regions[i];
      const n = parseInt(el.getAttribute("data-n"), 10);
      if (n === selectedColor && !regionState[String(i)]) {
        el.style.filter = "brightness(1.4) drop-shadow(0 0 6px white)";
        setTimeout(() => { el.style.filter = ""; }, 700);
        return;
      }
    }
  }

  function nextLevel() {
    const idx = LEVELS.findIndex(l => l.id === currentLevel.id);
    startLevel((idx + 1) % LEVELS.length);
  }

  function goHome() {
    renderLevelCards();
    gameScreen.classList.remove("active");
    startScreen.classList.add("active");
    completeOverlay.classList.add("hidden");
  }

  init();
})();
