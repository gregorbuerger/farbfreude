const LEVELS = [
  {
    id: "heart",
    name: "Herz",
    colors: [null, "#e74c3c", "#c0392b", "#ff7675", "#ffffff", "#fd79a8"],
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#faf8f5"/>
      <path class="region" data-n="1" d="M100,170 C100,170 20,110 20,70 C20,40 40,25 60,25 C80,25 95,40 100,55 C105,40 120,25 140,25 C160,25 180,40 180,70 C180,110 100,170 100,170 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="3" d="M55,45 C48,50 42,60 42,72 C42,85 55,100 70,115 C60,95 55,75 55,60 C55,52 55,45 55,45 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="3" d="M145,45 C152,50 158,60 158,72 C158,85 145,100 130,115 C140,95 145,75 145,60 C145,52 145,45 145,45 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <ellipse class="region" data-n="4" cx="70" cy="50" rx="12" ry="8" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="5" d="M100,100 Q85,90 80,100 Q85,110 100,120 Q115,110 120,100 Q115,90 100,100 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="2" d="M100,150 C100,150 50,110 50,78 C50,62 60,50 72,50 C82,50 92,58 96,68 L100,78 L104,68 C108,58 118,50 128,50 C140,50 150,62 150,78 C150,110 100,150 100,150 Z" fill="#eee" stroke="#333" stroke-width="1"/>
    </svg>`
  },
  {
    id: "flower",
    name: "Blume",
    colors: [null, "#e84393", "#fd79a8", "#fdcb6e", "#ffeaa7", "#00b894", "#55efc4"],
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="220" fill="#faf8f5"/>
      <ellipse class="region" data-n="1" cx="100" cy="55" rx="22" ry="32" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="2" cx="130" cy="70" rx="22" ry="32" transform="rotate(40 130 70)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="1" cx="140" cy="105" rx="22" ry="32" transform="rotate(80 140 105)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="2" cx="115" cy="135" rx="22" ry="32" transform="rotate(120 115 135)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="1" cx="80" cy="135" rx="22" ry="32" transform="rotate(160 80 135)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="2" cx="55" cy="105" rx="22" ry="32" transform="rotate(200 55 105)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="1" cx="60" cy="70" rx="22" ry="32" transform="rotate(240 60 70)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <circle class="region" data-n="3" cx="100" cy="95" r="22" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <circle class="region" data-n="4" cx="100" cy="95" r="12" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="5" d="M95,117 L95,195 L105,195 L105,117 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="6" cx="70" cy="160" rx="28" ry="12" transform="rotate(-30 70 160)" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="6" cx="130" cy="175" rx="28" ry="12" transform="rotate(25 130 175)" fill="#eee" stroke="#333" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: "cupcake",
    name: "Cupcake",
    colors: [null, "#fd79a8", "#e84393", "#ffeaa7", "#fdcb6e", "#e17055", "#d63031", "#ffffff", "#a29bfe"],
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="220" fill="#faf8f5"/>
      <path class="region" data-n="5" d="M50,130 L55,200 L145,200 L150,130 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <ellipse class="region" data-n="3" cx="100" cy="125" rx="55" ry="20" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="1" d="M48,120 Q40,90 60,85 Q70,60 100,70 Q130,60 140,85 Q160,90 152,120 Q130,110 100,115 Q70,110 48,120 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="2" d="M70,95 Q80,80 100,85 Q120,80 130,95 Q120,100 100,98 Q80,100 70,95 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="6" cx="100" cy="55" r="14" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path d="M100,42 Q105,30 112,35" fill="none" stroke="#333" stroke-width="2"/>
      <circle class="region" data-n="8" cx="75" cy="100" r="4" fill="#eee" stroke="#333" stroke-width="0.8"/>
      <circle class="region" data-n="8" cx="120" cy="95" r="4" fill="#eee" stroke="#333" stroke-width="0.8"/>
      <circle class="region" data-n="8" cx="95" cy="110" r="3.5" fill="#eee" stroke="#333" stroke-width="0.8"/>
      <circle class="region" data-n="7" cx="100" cy="48" r="3" fill="#eee" stroke="#333" stroke-width="0.5"/>
    </svg>`
  },
  {
    id: "sun",
    name: "Sonne",
    colors: [null, "#fdcb6e", "#f39c12", "#e67e22", "#ffeaa7", "#ffffff", "#74b9ff"],
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect class="region" data-n="6" width="200" height="200" fill="#eee" stroke="none"/>
      <path class="region" data-n="3" d="M100,12 L110,48 L90,48 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="2" d="M100,188 L110,152 L90,152 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="3" d="M12,100 L48,110 L48,90 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="2" d="M188,100 L152,110 L152,90 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="2" d="M32,32 L58,52 L48,62 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="3" d="M168,32 L142,52 L152,62 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="2" d="M32,168 L58,148 L48,138 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="3" d="M168,168 L142,148 L152,138 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="1" cx="100" cy="100" r="42" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <circle class="region" data-n="4" cx="100" cy="100" r="28" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="5" cx="85" cy="92" r="6" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <circle class="region" data-n="5" cx="115" cy="92" r="6" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <path d="M82,115 Q100,130 118,115" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "tree",
    name: "Baum",
    colors: [null, "#27ae60", "#2ecc71", "#1e8449", "#8b4513", "#a0522d", "#f1c40f", "#e74c3c", "#87ceeb"],
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <rect class="region" data-n="8" width="200" height="240" fill="#eee" stroke="none"/>
      <circle class="region" data-n="1" cx="100" cy="80" r="55" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <circle class="region" data-n="2" cx="70" cy="95" r="35" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <circle class="region" data-n="3" cx="130" cy="90" r="32" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <circle class="region" data-n="2" cx="100" cy="50" r="30" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <path class="region" data-n="4" d="M85,130 L85,210 L115,210 L115,130 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="5" d="M90,130 L90,210 L100,210 L100,130 Z" fill="#eee" stroke="none"/>
      <circle class="region" data-n="6" cx="75" cy="70" r="8" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="7" cx="125" cy="75" r="8" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="6" cx="95" cy="100" r="7" fill="#eee" stroke="#333" stroke-width="1"/>
      <circle class="region" data-n="7" cx="55" cy="100" r="7" fill="#eee" stroke="#333" stroke-width="1"/>
    </svg>`
  },
  {
    id: "house",
    name: "Haus",
    colors: [null, "#e74c3c", "#c0392b", "#f5f6fa", "#dfe6e9", "#74b9ff", "#0984e3", "#6c5ce7", "#00b894", "#fdcb6e", "#ffeaa7"],
    svg: `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="200" fill="#faf8f5"/>
      <circle class="region" data-n="9" cx="185" cy="35" r="22" fill="#eee" stroke="#333" stroke-width="1.2"/>
      <circle class="region" data-n="10" cx="185" cy="35" r="12" fill="#eee" stroke="#333" stroke-width="1"/>
      <path class="region" data-n="1" d="M30,95 L110,25 L190,95 Z" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="2" d="M50,95 L110,45 L170,95 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <rect class="region" data-n="3" x="50" y="95" width="120" height="80" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <path class="region" data-n="4" d="M150,95 L170,95 L170,175 L150,175 Z" fill="#eee" stroke="#333" stroke-width="1"/>
      <rect class="region" data-n="5" x="65" y="110" width="30" height="28" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <line x1="80" y1="110" x2="80" y2="138" stroke="#333" stroke-width="1"/>
      <line x1="65" y1="124" x2="95" y2="124" stroke="#333" stroke-width="1"/>
      <rect class="region" data-n="5" x="125" y="110" width="30" height="28" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <line x1="140" y1="110" x2="140" y2="138" stroke="#333" stroke-width="1"/>
      <line x1="125" y1="124" x2="155" y2="124" stroke="#333" stroke-width="1"/>
      <rect class="region" data-n="7" x="95" y="145" width="30" height="30" fill="#eee" stroke="#333" stroke-width="1.5"/>
      <circle cx="120" cy="160" r="2.5" fill="#333"/>
      <rect class="region" data-n="8" x="0" y="175" width="220" height="25" fill="#eee" stroke="#333" stroke-width="1"/>
    </svg>`
  }
];
