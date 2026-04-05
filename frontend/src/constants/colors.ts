

// ═══════════════════════════════════════════════════
// FILE: src/constants/colors.ts
// Theme: Deep navy-blue dark (matching Orizon screenshot)
// Blue gradient bg × white text × bright blue accents
// ═══════════════════════════════════════════════════

export const C = {
  // ── Backgrounds (dark navy-blue like screenshot)
  bg:        "#0A0E1A",   // deep navy dark
  bgDark:    "#060A14",   // deeper for sections
  bgMid:     "#0D1525",   // mid-tone navy
  bgCard:    "#111827",   // card bg
  bgCardHov: "#151F35",   // card hover
  bgAccent:  "#0F1B2D",   // subtle accent bg
  bgGlass:   "rgba(13,21,37,0.7)", // glassmorphism

  // ── Borders
  border:    "rgba(59,130,246,0.12)",
  borderMd:  "rgba(59,130,246,0.25)",
  borderBrt: "rgba(59,130,246,0.5)",

  // ── Brand blue (Orizon-style bright blue)
  blue:      "#3B82F6",   // primary blue
  blueLt:    "#60A5FA",   // lighter blue
  blueBright:"#2563EB",   // deep blue
  blueBg:    "rgba(59,130,246,0.08)",
  blueGlow:  "rgba(59,130,246,0.25)",

  // ── Text
  white:     "#FFFFFF",
  textPrim:  "#F1F5F9",   // near white
  textSec:   "#94A3B8",   // slate-400
  textMuted: "#475569",   // slate-600
  textDim:   "#1E293B",   // very dim (for scroll reveal start)

  // ── Accents
  cyan:      "#06B6D4",
  lime:      "#84CC16",
  violet:    "#8B5CF6",
  green:     "#22C55E",
  gold:      "#F59E0B",
  coral:     "#EF4444",

  // ── Gradients (string values used in background)
  gradHero:  "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.35) 0%, rgba(10,14,26,0) 70%)",
  gradBlue:  "linear-gradient(135deg, #1D4ED8, #3B82F6, #60A5FA)",
  gradCard:  "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
  gradGrid:  "radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)",

  // ── Shadows
  shadow:    "rgba(0,0,0,0.4)",
  shadowBlue:"rgba(59,130,246,0.2)",
  shadowCard:"0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1)",
};

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  background: ${C.bg};
  color: ${C.textPrim};
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: ${C.bg}; }
::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 2px; }

/* ── Animations ── */
@keyframes fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes slideLeft{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes pulse    { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
@keyframes pulseGlow{ 0%,100%{box-shadow:0 0 20px rgba(59,130,246,.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,.7)} }
@keyframes spin     { to{transform:rotate(360deg)} }
@keyframes spinR    { to{transform:rotate(-360deg)} }
@keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes scanline { 0%{top:-3%} 100%{top:103%} }
@keyframes marqueeL { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes orb1     { 0%{transform:rotate(0deg) translateX(62px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(62px) rotate(-360deg)} }
@keyframes orb2     { 0%{transform:rotate(120deg) translateX(95px) rotate(-120deg)} 100%{transform:rotate(480deg) translateX(95px) rotate(-480deg)} }
@keyframes orb3     { 0%{transform:rotate(240deg) translateX(128px) rotate(-240deg)} 100%{transform:rotate(600deg) translateX(128px) rotate(-600deg)} }
@keyframes ringOut  { 0%{transform:scale(.7);opacity:.9} 100%{transform:scale(2.4);opacity:0} }
@keyframes bounce   { 0%,100%{transform:scale(1)} 60%{transform:scale(1.1)} }
@keyframes slideUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
@keyframes shimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
@keyframes gridMove { from{background-position:0 0} to{background-position:40px 40px} }
@keyframes countUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes successBounce { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }

/* ── Word-by-word scroll reveal ── */
.word-reveal .word {
  display: inline-block;
  color: ${C.textDim};
  transition: color 0.4s ease;
}
.word-reveal .word.lit {
  color: ${C.textPrim};
}

/* ── Cards scroll animation ── */
.cards-container {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ── Blue shimmer text ── */
.shim-blue {
  background: linear-gradient(90deg, ${C.blue}, ${C.cyan}, ${C.blue});
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

/* ── Dot grid bg ── */
.dot-grid {
  background-image: ${C.gradGrid};
  background-size: 28px 28px;
}

/* ── Label chip ── */
.label-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  color: ${C.blue};
}
.label-chip::before {
  content: ''; display: block;
  width: 6px; height: 6px; border-radius: 50%;
  background: ${C.blue}; animation: pulse 2s infinite;
}

/* ── Divider ── */
.divider { height: 1px; background: linear-gradient(90deg, transparent, ${C.border}, transparent); }

/* ── Stagger fade-up ── */
.fu  { animation: fadeUp .65s ease forwards; opacity: 0; }
.fu1 { animation-delay: .06s; } .fu2 { animation-delay: .15s; }
.fu3 { animation-delay: .24s; } .fu4 { animation-delay: .33s; }
.fu5 { animation-delay: .42s; } .fu6 { animation-delay: .52s; }

/* ── Responsive ── */
@media(max-width:960px) {
  .hero-grid     { grid-template-columns: 1fr !important; }
  .hero-right-col{ display: none !important; }
  .two-col       { grid-template-columns: 1fr !important; }
  .three-col     { grid-template-columns: 1fr !important; }
  .carousel-grid { grid-template-columns: 1fr !important; }
  .carousel-sides{ display: none !important; }
  .dash-charts   { grid-template-columns: 1fr !important; }
  .dash-kpis     { grid-template-columns: 1fr 1fr !important; }
  .dash-bottom   { grid-template-columns: 1fr !important; }
  .nav-links     { display: none !important; }
  .nav-cta-d     { display: none !important; }
  .ham-btn       { display: flex !important; }
  .contact-grid  { grid-template-columns: 1fr !important; }
  .contact-left  { display: none !important; }
  .footer-grid   { grid-template-columns: 1fr 1fr !important; }
  .stat-row      { grid-template-columns: repeat(2,1fr) !important; }
}
@media(max-width:600px) {
  .footer-grid { grid-template-columns: 1fr !important; }
  .stat-row    { grid-template-columns: 1fr 1fr !important; }
  .dash-kpis   { grid-template-columns: 1fr 1fr !important; }
}

/* ── Mobile menu ── */
.mob-menu {
  display: none; position: fixed; inset: 0;
  background: rgba(6,10,20,0.98);
  backdrop-filter: blur(20px);
  z-index: 998; flex-direction: column;
  align-items: center; justify-content: center; gap: 40px;
}
.mob-menu.open { display: flex; animation: fadeIn .3s ease; }

/* ── Hamburger ── */
.ham-btn {
  display: none; flex-direction: row; align-items: center; gap: 10px;
  background: none; border: none; padding: 6px 0;
  z-index: 999; cursor: pointer;
}
.ham-btn .ham-label {
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  color: ${C.textPrim}; letter-spacing: 2px; text-transform: uppercase;
}
.ham-btn .ham-lines { display: flex; flex-direction: column; gap: 5px; }
.ham-btn .ham-lines span {
  display: block; width: 22px; height: 2px;
  background: ${C.textPrim}; border-radius: 2px; transition: all .3s;
}

input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
input, textarea, button { font-family: 'DM Sans', sans-serif; }
a { text-decoration: none; }
`;