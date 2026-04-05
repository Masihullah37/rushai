

// ════════════════════════════════════════════════════════════════
// FILE: src/components/Services.tsx — UPDATED
// Removed "10" from title, improved typography, same scroll animations
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { C } from "../constants/colors";

const SVCS = [
  { n:"01", icon:"🤖", title:"Solutions IA & RAG",       desc:"IA privée entraînée sur vos données d'entreprise. Zéro exposition externe, sécurité de niveau enterprise.", tag:"ESSENTIEL", accent:C.blue },
  { n:"02", icon:"🔐", title:"Sécurité IA & Données",    desc:"Déploiement sur site, chiffrement AES-256, contrôle d'accès, architectures IA conformes RGPD/SOC2.", tag:"ENTERPRISE", accent:C.cyan },
  { n:"03", icon:"💬", title:"Chatbots Intelligents",    desc:"Assistants IA omnicanaux pour web, WhatsApp et CRM. Automatisez 70%+ des requêtes clients 24h/24.", tag:"POPULAIRE", accent:C.blue },
  { n:"04", icon:"🔗", title:"Développement API",        desc:"APIs REST & GraphQL sur mesure. Architecture microservices, intégrations tierces, zéro interruption.", tag:"BACKEND", accent:C.violet },
  { n:"05", icon:"🧠", title:"Conseil IA",               desc:"Cartographie stratégique : analyse des flux, opportunités ROI élevé, roadmap d'implémentation.", tag:"PREMIUM", accent:C.cyan },
  { n:"06", icon:"⚙️", title:"Automatisation",           desc:"Automatisation bout en bout. Des déclencheurs no-code aux orchestrations multi-systèmes complexes.", tag:"EFFICACITÉ", accent:C.blue },
  { n:"07", icon:"📊", title:"Ingénierie des Données",   desc:"Pipelines ETL en production, nettoyage, transformation et architecture de données scalable.", tag:"ANALYTIQUE", accent:C.violet },
  { n:"08", icon:"📈", title:"Tableaux de Bord BI",      desc:"Dashboards interactifs temps réel, suivi KPI, reporting dirigeants et aide à la décision.", tag:"INSIGHTS", accent:C.cyan },
  { n:"09", icon:"📡", title:"Monitoring & Performance", desc:"Suivi des modèles IA, observabilité système, alertes intelligentes. Visibilité complète.", tag:"DEVOPS", accent:C.blue },
  { n:"10", icon:"🐳", title:"DevOps & Déploiement",     desc:"Docker, CI/CD GitHub Actions, infrastructure cloud AWS/GCP/Hostinger. Production rapide.", tag:"INFRA", accent:C.violet },
];

/* ── Word-by-word scroll reveal ── */
function WordReveal({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const words = text.split(" ");
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.5)));
      setLit(Math.floor(prog * words.length));
    };
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, [words.length]);
  return (
    <div ref={ref} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ color: i < lit ? C.white : C.textDim, transition: "color .4s ease" }}>
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
}

/* ── Card with scroll in/out animation ── */
function ServiceCard({ svc, index }: { svc: typeof SVCS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const dirs = ["translateX(-60px)", "translateY(60px)", "translateX(60px)"];
  const dir = dirs[index % 3];

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientX - r.left) / r.width - .5) * 16, y: ((e.clientY - r.top) / r.height - .5) * -16 }); }}
      style={{
        background: hov ? "rgba(59,130,246,.08)" : C.bgCard,
        border: `1px solid ${hov ? svc.accent + "55" : C.border}`,
        borderRadius: 20, padding: "28px 24px", cursor: "default",
        transform: vis
          ? `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hov ? -8 : 0}px) scale(${hov ? 1.02 : 1})`
          : `perspective(700px) ${dir} scale(0.88)`,
        opacity: vis ? 1 : 0,
        transition: `transform ${0.5 + index * 0.04}s cubic-bezier(.25,.46,.45,.94), opacity ${0.4 + index * 0.04}s ease, box-shadow .3s, border-color .3s, background .3s`,
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,.5), 0 0 0 1px ${svc.accent}33` : `0 4px 24px rgba(0,0,0,.3)`,
        position: "relative", overflow: "hidden",
        transitionDelay: vis ? `${index * 0.05}s` : "0s",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hov ? `linear-gradient(90deg,transparent,${svc.accent},transparent)` : "transparent", transition: "background .3s" }} />
      {hov && <div style={{ position: "absolute", top: -60, right: -60, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle,${svc.accent}18,transparent 70%)`, pointerEvents: "none" }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${svc.accent}14`, border: `1px solid ${svc.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, transition: "box-shadow .3s", boxShadow: hov ? `0 0 20px ${svc.accent}44` : "none" }}>{svc.icon}</div>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.2, padding: "3px 10px", borderRadius: "100px", background: `${svc.accent}14`, color: svc.accent, border: `1px solid ${svc.accent}33` }}>{svc.tag}</span>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15.5, fontWeight: 700, color: C.white, marginBottom: 10, lineHeight: 1.3 }}>{svc.title}</div>
      <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.72 }}>{svc.desc}</div>
      {hov && <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 7, animation: "slideUp .3s ease" }}>
        <div style={{ width: 16, height: 1, background: svc.accent }} />
        <span style={{ fontSize: 10, color: svc.accent, fontFamily: "'JetBrains Mono',monospace" }}>En savoir plus</span>
      </div>}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ padding: "clamp(80px,10vw,120px) clamp(16px,4vw,32px)", background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Section header — NO "10", better copy ── */}
        <div style={{ marginBottom: 68, textAlign: "center" }}>
          <div className="label-chip" style={{ marginBottom: 20, justifyContent: "center" }}>Ce que nous construisons</div>

          {/* Title line 1 — serif-style with Syne */}
          <WordReveal text="Une expertise complète"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5.5vw,58px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.08, marginBottom: 4 }} />

          {/* Title line 2 — lighter weight italic feel */}
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,4vw,46px)", fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.1, color: C.textSec, marginBottom: 22, fontStyle: "italic" }}>
            du conseil au déploiement.
          </div>

          <p style={{ color: C.textSec, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Ingénierie IA end-to-end — stratégie, développement, mise en production et support continu.
          </p>
        </div>

        {/* ── All 10 cards in responsive grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {SVCS.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "14px 36px", borderRadius: 10, background: `linear-gradient(135deg,${C.blue},#1D4ED8)`, color: "#fff", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, boxShadow: `0 6px 28px rgba(59,130,246,.4)`, transition: "transform .2s,box-shadow .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px rgba(59,130,246,.55)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 28px rgba(59,130,246,.4)`; }}>
            Démarrer un Projet →
          </button>
        </div>
      </div>
    </section>
  );
}