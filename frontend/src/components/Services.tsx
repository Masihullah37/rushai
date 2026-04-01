// src/components/Services.tsx
import { useState, useEffect } from "react";
import { C } from "../constants/colors";

const SVCS = [
  { icon: "🤖", title: "Solutions IA & RAG", desc: "IA privée de type ChatGPT entraînée sur vos données d'entreprise. Zéro exposition externe, sécurité de niveau enterprise.", tag: "ESSENTIEL", color: C.teal, bg: C.tealBg },
  { icon: "🔐", title: "Sécurité IA & Données", desc: "Déploiement sur site, chiffrement AES-256, contrôle d'accès, architectures IA conformes RGPD/SOC2 pour enterprises.", tag: "ENTERPRISE", color: C.violet, bg: C.violetBg },
  { icon: "💬", title: "Chatbots Intelligents", desc: "Assistants IA omnicanaux pour web, WhatsApp et CRM. Automatisez 70%+ des requêtes clients 24h/24.", tag: "POPULAIRE", color: C.green, bg: C.greenBg },
  { icon: "🔗", title: "Développement API", desc: "APIs REST & GraphQL sur mesure. Architecture microservices, intégrations tierces, déploiements zéro interruption.", tag: "BACKEND", color: C.blue, bg: C.blueBg },
  { icon: "🧠", title: "Conseil IA", desc: "Cartographie stratégique IA : analyse des flux, identification des opportunités ROI élevé, roadmap d'implémentation complète.", tag: "PREMIUM", color: C.gold, bg: C.goldBg },
  { icon: "⚙️", title: "Automatisation", desc: "Automatisation de bout en bout des processus métier. Des déclencheurs no-code aux orchestrations multi-systèmes complexes.", tag: "EFFICACITÉ", color: C.teal, bg: C.tealBg },
  { icon: "📊", title: "Ingénierie des Données", desc: "Pipelines ETL en production, nettoyage, transformation et architecture de données scalable pour votre croissance.", tag: "ANALYTIQUE", color: "#db2777", bg: "rgba(219,39,119,.08)" },
  { icon: "📈", title: "Tableaux de Bord BI", desc: "Tableaux de bord interactifs temps réel, suivi KPI, reporting dirigeants et aide à la décision sur vos données.", tag: "INSIGHTS", color: C.green, bg: C.greenBg },
  { icon: "📡", title: "Monitoring & Performance", desc: "Suivi des modèles IA, observabilité système, alertes intelligentes. Visibilité complète sur chaque couche de votre infra.", tag: "DEVOPS", color: C.violet, bg: C.violetBg },
  { icon: "🐳", title: "DevOps & Déploiement", desc: "Docker, pipelines CI/CD GitHub Actions, infrastructure cloud AWS/GCP/Hostinger. Production rapide, scalabilité fiable.", tag: "INFRA", color: C.blue, bg: C.blueBg },
];

interface CardProps {
  offset: number;
  tilt: Record<number, { x: number; y: number }>;
  hov: number | null;
  setHov: (val: number | null) => void;
  setTilt: React.Dispatch<React.SetStateAction<Record<number, { x: number; y: number }>>>;
  getIdx: (off: number) => number;
}

function Card({ offset, tilt, hov, setHov, setTilt, getIdx }: CardProps) {
  const idx = getIdx(offset);
  const s = SVCS[idx];
  const t = tilt[offset] || { x: 0, y: 0 };
  const isC = offset === 1;
  const h = hov === offset;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt(prev => ({ ...prev, [offset]: { x: ((e.clientX - r.left) / r.width - .5) * 18, y: ((e.clientY - r.top) / r.height - .5) * -18 } }));
  };

  return (
    <div
      onMouseEnter={() => setHov(offset)}
      onMouseLeave={() => { setHov(null); setTilt(prev => ({ ...prev, [offset]: { x: 0, y: 0 } })); }}
      onMouseMove={onMove}
      style={{
        background: h ? s.bg : "white",
        border: `1.5px solid ${h ? s.color + "55" : isC ? C.borderMd : C.border}`,
        borderRadius: 22,
        padding: "28px 24px",
        transform: `perspective(700px) rotateX(${t.y}deg) rotateY(${t.x}deg) scale(${isC ? (h ? 1.03 : 1.01) : (h ? 1.01 : .97)}) translateY(${h ? -8 : isC ? -4 : 0}px)`,
        transition: "border-color .3s, background .3s, box-shadow .3s",
        boxShadow: h ? `0 24px 56px ${s.color}22, 0 0 0 1px ${s.color}22` : isC ? `0 10px 40px rgba(0,0,0,.07)` : `0 2px 12px rgba(0,0,0,.04)`,
        position: "relative", overflow: "hidden",
        opacity: isC ? 1 : .75,
        cursor: "default",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: h ? `linear-gradient(90deg,transparent,${s.color},transparent)` : isC ? `linear-gradient(90deg,transparent,${s.color}66,transparent)` : "transparent", transition: "background .3s", borderRadius: "22px 22px 0 0" }} />
      {h && <div style={{ position: "absolute", top: -60, right: -60, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle,${s.color}18,transparent 70%)`, pointerEvents: "none" }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, border: `1.5px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: h ? `0 6px 20px ${s.color}33` : "none", transition: "box-shadow .3s" }}>{s.icon}</div>
        <span style={{ fontSize: 8, fontFamily: "'JetBrains Mono',monospace", color: s.color, border: `1px solid ${s.color}44`, borderRadius: 5, padding: "2px 9px", letterSpacing: 1, background: s.bg }}>{s.tag}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10, fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{s.title}</div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.75 }}>{s.desc}</div>
      {h && <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 7, animation: "fadeIn .3s ease" }}>
        <div style={{ width: 18, height: 1, background: s.color }} />
        <span style={{ fontSize: 10, color: s.color, fontFamily: "'JetBrains Mono',monospace" }}>En savoir plus</span>
      </div>}
    </div>
  );
}

function ServiceCarousel() {
  const [cur, setCur] = useState(0);
  const [tilt, setTilt] = useState<Record<number, { x: number; y: number }>>({});
  const [hov, setHov] = useState<number | null>(null);
  const total = SVCS.length;

  useEffect(() => { const id = setInterval(() => setCur(c => (c + 1) % total), 4500); return () => clearInterval(id); }, []);

  const getIdx = (off: number) => (cur + off + total) % total;

  return (
    <div>
      <div className="carousel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 28 }}>
        <div className="carousel-sides">
          <Card offset={0} tilt={tilt} hov={hov} setHov={setHov} setTilt={setTilt} getIdx={getIdx} />
        </div>
        <Card offset={1} tilt={tilt} hov={hov} setHov={setHov} setTilt={setTilt} getIdx={getIdx} />
        <div className="carousel-sides">
          <Card offset={2} tilt={tilt} hov={hov} setHov={setHov} setTilt={setTilt} getIdx={getIdx} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <button onClick={() => setCur(c => (c - 1 + total) % total)} style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,.06)", transition: "all .2s", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLt; e.currentTarget.style.color = C.teal; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>←</button>
        <div style={{ display: "flex", gap: 7 }}>
          {SVCS.map((_, i) => <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 22 : 7, height: 7, borderRadius: 4, border: "none", background: i === cur ? C.teal : "#cbd5e1", transition: "all .35s", padding: 0, cursor: "pointer" }} />)}
        </div>
        <button onClick={() => setCur(c => (c + 1) % total)} style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,.06)", transition: "all .2s", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLt; e.currentTarget.style.color = C.teal; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>→</button>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ padding: "clamp(60px,10vw,120px) clamp(16px,4vw,28px)", background: "white" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.teal, letterSpacing: 3, marginBottom: 14 }}>// CE QUE NOUS CONSTRUISONS</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, color: C.text, letterSpacing: -1.5, marginBottom: 16 }}>
            10 Services. <span className="shim">Une équipe d'experts.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>Ingénierie IA complète — de la stratégie au déploiement en production et au support continu.</p>
        </div>
        <ServiceCarousel />
      </div>
    </section>
  );
}