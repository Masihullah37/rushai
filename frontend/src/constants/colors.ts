// src/constants/colors.ts
export const C = {
  bg:        "#f8faff",
  bgAlt:     "#ffffff",
  bgSoft:    "#f0f7ff",
  surface:   "rgba(255,255,255,0.9)",
  surfaceHi: "rgba(255,255,255,0.95)",
  border:    "rgba(20,184,166,0.15)",
  borderMd:  "rgba(20,184,166,0.30)",
  teal:      "#0d9488",
  tealLt:    "#14b8a6",
  tealBg:    "rgba(20,184,166,0.08)",
  tealBgMd:  "rgba(20,184,166,0.15)",
  blue:      "#2563eb",
  blueLt:    "#3b82f6",
  blueBg:    "rgba(37,99,235,0.07)",
  gold:      "#d97706",
  goldBg:    "rgba(217,119,6,0.08)",
  green:     "#059669",
  greenBg:   "rgba(5,150,105,0.09)",
  violet:    "#7c3aed",
  violetBg:  "rgba(124,58,237,0.08)",
  coral:     "#e11d48",
  text:      "#0f172a",
  textSec:   "#334155",
  muted:     "#64748b",
  light:     "#94a3b8",
  shadow:    "rgba(20,184,166,0.18)",
  shadowBlue:"rgba(37,99,235,0.14)",
};

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;700&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#f8faff;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:#f1f5f9;}
::-webkit-scrollbar-thumb{background:${C.tealLt};border-radius:2px;}
input,textarea{font-family:'DM Sans',sans-serif;}
input::placeholder,textarea::placeholder{color:${C.light};}
button{cursor:pointer;font-family:'DM Sans',sans-serif;}
a{text-decoration:none;}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(.8deg)}}
@keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes floatC{0%,100%{transform:translateY(-4px)}50%{transform:translateY(6px)}}
@keyframes floatD{0%,100%{transform:translateY(2px)}50%{transform:translateY(-10px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinR{to{transform:rotate(-360deg)}}
@keyframes orb1{0%{transform:rotate(0deg) translateX(62px) rotate(0deg)}100%{transform:rotate(360deg) translateX(62px) rotate(-360deg)}}
@keyframes orb2{0%{transform:rotate(115deg) translateX(94px) rotate(-115deg)}100%{transform:rotate(475deg) translateX(94px) rotate(-475deg)}}
@keyframes orb3{0%{transform:rotate(235deg) translateX(124px) rotate(-235deg)}100%{transform:rotate(595deg) translateX(124px) rotate(-595deg)}}
@keyframes scanline{0%{top:-3%}100%{top:103%}}
@keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes glowPulse{0%,100%{box-shadow:0 6px 32px ${C.shadow}}50%{box-shadow:0 10px 48px rgba(20,184,166,.35)}}
@keyframes successBounce{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
@keyframes ringOut{0%{transform:scale(.7);opacity:.9}100%{transform:scale(2.4);opacity:0}}
@keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

.shim{
  background:linear-gradient(90deg,${C.teal},${C.blue},${C.gold},${C.teal});
  background-size:300% auto;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  animation:shimmer 5s linear infinite;
}

.mesh-bg{
  background-color:#f8faff;
  background-image:
    linear-gradient(rgba(20,184,166,0.06) 1px, transparent 1px),
    linear-gradient(90deg,rgba(20,184,166,0.06) 1px, transparent 1px);
  background-size:48px 48px;
}

.fu{animation:fadeUp .65s ease forwards;opacity:0;}
.fu1{animation-delay:.06s;}.fu2{animation-delay:.15s;}.fu3{animation-delay:.24s;}
.fu4{animation-delay:.33s;}.fu5{animation-delay:.42s;}.fu6{animation-delay:.52s;}

@media(max-width:960px){
  .hero-grid{grid-template-columns:1fr !important;}
  .hero-right-col{display:none !important;}
  .two-col{grid-template-columns:1fr !important;}
  .three-col{grid-template-columns:1fr !important;}
  .four-col{grid-template-columns:1fr 1fr !important;}
  .carousel-sides{display:none !important;}
  .carousel-grid{grid-template-columns:1fr !important;}
  .dash-charts{grid-template-columns:1fr !important;}
  .dash-kpis{grid-template-columns:1fr 1fr !important;}
  .dash-bottom{grid-template-columns:1fr !important;}
  .nav-links{display:none !important;}
  .nav-cta-d{display:none !important;}
  .ham-btn{display:flex !important;}
  .contact-grid{grid-template-columns:1fr !important;}
  .contact-left{display:none !important;}
  .footer-grid{grid-template-columns:1fr 1fr !important;}
  .stat-row{grid-template-columns:repeat(2,1fr) !important;}
}
@media(max-width:600px){
  .four-col{grid-template-columns:1fr !important;}
  .footer-grid{grid-template-columns:1fr !important;}
  .stat-row{grid-template-columns:repeat(2,1fr) !important;}
}

.mob-menu{
  display:none;position:fixed;inset:0;
  background:rgba(248,250,255,.97);
  backdrop-filter:blur(20px);
  z-index:998;
  flex-direction:column;align-items:center;justify-content:center;gap:32px;
}
.mob-menu.open{display:flex;}
.ham-btn{
  display:none;flex-direction:column;gap:5px;
  background:none;border:none;padding:6px;z-index:999;
}
.ham-btn span{display:block;width:24px;height:2px;background:${C.text};border-radius:2px;transition:all .3s;}
`;