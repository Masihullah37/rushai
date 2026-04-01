import { memo, useState, useEffect, useRef } from "react";
import { C } from "../constants/colors";

const Particles = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();
  const mouse = useRef({ x: -9999, y: -9999 });
  const pts = useRef<Array<{ x: number; y: number; vx: number; vy: number; r: number }>>([]);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = cv.width = cv.offsetWidth, H = cv.height = cv.offsetHeight;
    pts.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.2 + .3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.current.length; i++) {
        const p = pts.current[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const d = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
        if (d < 120 && d > 0) { p.vx += (p.x - mouse.current.x) / d * .03; p.vy += (p.y - mouse.current.y) / d * .03; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(13,148,136,.4)"; ctx.fill();
        for (let j = i + 1; j < pts.current.length; j++) {
          const dx = p.x - pts.current[j].x, dy = p.y - pts.current[j].y;
          const dd = Math.hypot(dx, dy);
          if (dd < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts.current[j].x, pts.current[j].y);
            ctx.strokeStyle = `rgba(13,148,136,${.1 * (1 - dd / 100)})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    const onM = (e: MouseEvent) => { const r = cv.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onR = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    window.addEventListener("mousemove", onM); window.addEventListener("resize", onR);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); window.removeEventListener("mousemove", onM); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .5, pointerEvents: "none" }} />;
});

function TW({ words }: { words: string[] }) {
  const [txt, setTxt] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const id = setTimeout(() => {
      if (!del) { setTxt(w.slice(0, ci + 1)); if (ci + 1 === w.length) setTimeout(() => setDel(true), 2100); else setCi(c => c + 1); }
      else { setTxt(w.slice(0, ci - 1)); if (ci === 0) { setDel(false); setWi(i => (i + 1) % words.length); } else setCi(c => c - 1); }
    }, del ? 30 : 68);
    return () => clearTimeout(id);
  }, [ci, del, wi, words]);
  return <span className="shim">{txt}<span style={{ animation: "blink 1s infinite", WebkitTextFillColor: C.teal }}>|</span></span>;
}

const OrbitalCore = memo(() => (
  <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto", flexShrink: 0 }}>
    <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", background: `radial-gradient(circle,${C.tealLt}20,transparent 70%)`, animation: "pulse 3.5s infinite", pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(72deg) rotateY(10deg)", width: 124, height: 124, borderRadius: "50%", border: `1.5px dashed ${C.tealLt}55`, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -7, marginTop: -7, animation: "orb1 4s linear infinite" }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: `linear-gradient(135deg,${C.tealLt},${C.blue})`, boxShadow: `0 0 12px ${C.tealLt}99`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>⚡</div>
      </div>
    </div>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(72deg) rotateY(-30deg)", width: 190, height: 190, borderRadius: "50%", border: `1px solid ${C.blue}33`, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -6, marginTop: -6, animation: "orb2 7s linear infinite" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.blue, boxShadow: `0 0 10px ${C.blue}88` }} />
      </div>
    </div>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateX(72deg) rotateY(48deg)", width: 248, height: 248, borderRadius: "50%", border: `1px solid ${C.gold}33`, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -5, marginTop: -5, animation: "orb3 11s linear infinite" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.gold, boxShadow: `0 0 9px ${C.gold}88` }} />
      </div>
    </div>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 68, height: 68, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal},${C.blue})`, boxShadow: `0 0 32px ${C.tealLt}66, 0 0 64px ${C.tealLt}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 27, zIndex: 5, animation: "floatB 4s ease-in-out infinite" }}>🧠</div>
    <div style={{ position: "absolute", inset: "8%", borderRadius: "50%", border: `1px solid ${C.tealLt}18`, animation: "spin 22s linear infinite", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: "2%", borderRadius: "50%", border: `1px solid ${C.tealLt}0c`, animation: "spinR 30s linear infinite", pointerEvents: "none" }} />
  </div>
));

interface FloatBadgeProps {
  pos: Record<string, string | undefined>;
  icon: string;
  label: string;
  sub: string;
  color: string;
  bg: string;
  anim: string;
}

function FloatBadge({ pos, icon, label, sub, color, bg, anim }: FloatBadgeProps) {
  // Filtrer les propriétés undefined
  const filteredPos = Object.fromEntries(
    Object.entries(pos).filter(([, value]) => value !== undefined)
  ) as Record<string, string>;
  
  return (
    <div style={{
      position: "absolute", ...filteredPos,
      background: "rgba(255,255,255,0.92)",
      border: `1.5px solid ${color}33`,
      backdropFilter: "blur(16px)",
      borderRadius: 16, padding: "10px 14px",
      display: "flex", alignItems: "center", gap: 10,
      animation: anim,
      boxShadow: `0 8px 32px ${color}22, 0 2px 8px rgba(0,0,0,.06)`,
      zIndex: 4, minWidth: 148,
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text, fontFamily: "'Syne',sans-serif" }}>{label}</div>
        <div style={{ fontSize: 9.5, color, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const badges = [
    { pos: { top: "2%", left: "-12%" }, icon: "🔐", label: "IA Privée", sub: "Déploiement on-premise", color: C.violet, bg: C.violetBg, anim: "floatA 4.5s ease-in-out infinite" },
    { pos: { top: "2%", right: "-12%" }, icon: "⚡", label: "CI/CD Rapide", sub: "GitHub Actions", color: C.teal, bg: C.tealBg, anim: "floatB 4s .8s ease-in-out infinite" },
    { pos: { bottom: "2%", left: "-12%" }, icon: "📊", label: "Tableaux de Bord", sub: "KPIs temps réel", color: C.green, bg: C.greenBg, anim: "floatC 5s 1.5s ease-in-out infinite" },
    { pos: { bottom: "2%", right: "-12%" }, icon: "🤖", label: "Chatbots IA", sub: "Automatisation 24/7", color: C.gold, bg: C.goldBg, anim: "floatD 3.8s .4s ease-in-out infinite" },
  ];

  return (
    <section id="home" className="mesh-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", paddingTop: 68, overflow: "hidden" }}>
      <Particles />
      <div style={{ position: "absolute", top: "10%", left: "2%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.tealLt}14,transparent 65%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "8%", right: "4%", width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,${C.blue}0c,transparent 65%)`, filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="hero-grid" style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(60px,10vw,90px) clamp(16px,4vw,28px)", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(30px,5vw,56px)", alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
        <div>
          <div className="fu fu1" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.tealBg, border: `1.5px solid ${C.tealLt}33`, borderRadius: 100, padding: "7px 16px", fontSize: "clamp(9px,2vw,10.5px)", color: C.teal, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1.5, marginBottom: 26 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, animation: "pulse 2s infinite" }} />
            SPÉCIALISTE IA & AUTOMATISATION
          </div>

          <h1 className="fu fu2" style={{ 
  fontFamily: "'Syne',sans-serif", 
  fontSize: "clamp(28px,5vw,60px)", 
  fontWeight: 800, 
  lineHeight: 1.1, 
  letterSpacing: -2, 
  marginBottom: 20, 
  color: C.text 
}}>
  Nous créons<br />
  {/* Conteneur à hauteur fixe pour éviter le layout shift */}
  <span style={{ 
    display: "block",
    minHeight: "1.2em",
    overflow: "hidden"
  }}>
    <TW words={["des systèmes IA sécurisés.", "des plateformes RAG.", "des chatbots intelligents.", "des pipelines de données.", "des APIs performantes."]} />
  </span>
  <span style={{ fontWeight: 400, fontSize: ".62em", color: C.muted, letterSpacing: -1 }}>
    pour les entreprises exigeantes.
  </span>
</h1>
         
          <p className="fu fu3" style={{ fontSize: "clamp(13px,2.5vw,15.5px)", color: C.muted, lineHeight: 1.85, marginBottom: 36, maxWidth: 490 }}>
            De l'IA privée entraînée sur vos données à un déploiement DevOps complet — nous transformons vos données complexes en solutions intelligentes, sécurisées et automatisées à forte valeur ajoutée.
          </p>
          <div className="fu fu4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ padding: "clamp(11px,2vw,14px) clamp(20px,4vw,32px)", borderRadius: 13, background: `linear-gradient(135deg,${C.teal},${C.blue})`, color: "white", fontWeight: 800, fontSize: "clamp(13px,2vw,14.5px)", fontFamily: "'Syne',sans-serif", textDecoration: "none", boxShadow: `0 6px 28px ${C.shadow}`, display: "inline-block", animation: "glowPulse 3s infinite" }}>Consultation gratuite →</a>
            <a href="#demo" onClick={e => { e.preventDefault(); document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" }); }} style={{ padding: "clamp(11px,2vw,14px) clamp(18px,3vw,26px)", borderRadius: 13, background: "white", border: `1.5px solid ${C.border}`, color: C.textSec, fontWeight: 500, fontSize: "clamp(13px,2vw,14.5px)", fontFamily: "'DM Sans',sans-serif", textDecoration: "none", display: "inline-block", boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>Voir les démos ↓</a>
          </div>
          <div className="fu fu5" style={{ display: "flex", gap: "clamp(20px,4vw,36px)", flexWrap: "wrap", paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            {[["50+", "Projets livrés"], ["30+", "Clients enterprise"], ["99%", "Satisfaction client"], ["5 ans", "Expertise IA"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,3vw,24px)", fontWeight: 800, color: C.teal, letterSpacing: -1 }}>{v}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right-col" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 380 }}>
          <OrbitalCore />
          {badges.map((fc, i) => (
            <FloatBadge
              key={i}
              pos={fc.pos}
              icon={fc.icon}
              label={fc.label}
              sub={fc.sub}
              color={fc.color}
              bg={fc.bg}
              anim={fc.anim}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

