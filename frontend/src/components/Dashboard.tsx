


// src/components/Dashboard.tsx
import { useState, useEffect, memo } from "react";
import { C } from "../constants/colors";

const Clock = memo(() => {
  const [t, setT] = useState(() => new Date().toLocaleTimeString("fr-FR"));
  useEffect(() => {
    const id = setInterval(() => setT(new Date().toLocaleTimeString("fr-FR")), 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ color: C.muted, fontSize: 9, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>;
});

const LiveDashboard = memo(() => {
  const [lineD, setLineD] = useState([42, 58, 51, 72, 63, 80, 74, 88, 79, 95]);
  const [bars, setBars] = useState([62, 78, 55, 88, 71, 94, 68]);
  // const [kpis, setKpis] = useState({ rev: 284.5, users: 14832, queries: 98.2, uptime: 99.97 });
  const [kpis, setKpis] = useState({ users: 14832, queries: 98.2, uptime: 99.97 });
  const [feed, setFeed] = useState([
    { t: "maintenant", m: "Requête RAG traitée", k: "ok" as const },
    { t: "2s", m: "Auth API réussie", k: "ok" as const },
    { t: "6s", m: "Inférence modèle 23ms", k: "info" as const },
    { t: "12s", m: "Pipeline ETL terminé", k: "warn" as const },
  ]);
  const [load, setLoad] = useState(74);

  useEffect(() => {
    const pool = [
      { m: "Requête RAG traitée", k: "ok" as const }, 
      { m: "Session chatbot démarrée", k: "info" as const },
      { m: "Appel API 18ms", k: "ok" as const }, 
      { m: "Pipeline ETL déclenché", k: "warn" as const },
      { m: "Prédiction IA servie", k: "ok" as const }, 
      { m: "Nouveau client intégré", k: "info" as const },
    ];
    const id = setInterval(() => {
      setLineD(d => { const nv = Math.max(15, Math.min(99, d[d.length - 1] + (Math.random() - .44) * 16)); return [...d.slice(1), nv]; });
      setBars(b => b.map(v => Math.max(18, Math.min(98, v + (Math.random() - .48) * 14))));
      setKpis(k => ({ users: k.users + Math.floor(Math.random() * 6), queries: +(k.queries + Math.random() * .15).toFixed(1), uptime: 99.97 }));
      setLoad(l => Math.max(30, Math.min(96, l + (Math.random() - .5) * 10)));
      setFeed(f => [{ t: "maintenant", ...pool[Math.floor(Math.random() * pool.length)] }, ...f.slice(0, 3)]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const W = 320, H = 76;
  const pts = lineD.map((v, i) => `${(i / (lineD.length - 1)) * W},${H - (v / 100) * H}`).join(" ");
  const fill = `0,${H} ${pts} ${W},${H}`;
  const kColor: Record<string, string> = { ok: C.green, info: C.teal, warn: C.gold };
  const days = ["L", "M", "Me", "J", "V", "S", "D"];

  return (
    <div style={{ background: "white", border: `1.5px solid ${C.border}`, borderRadius: 24, overflow: "hidden", padding: 22, fontFamily: "'JetBrains Mono',monospace", boxShadow: `0 20px 60px rgba(0,0,0,.07), 0 0 0 1px ${C.tealLt}0a`, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(transparent,${C.tealLt}22,transparent)`, animation: "scanline 6s linear infinite", pointerEvents: "none", zIndex: 10 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.teal},${C.blue},${C.gold})` }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, marginTop: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", boxShadow: `0 0 8px ${C.green}88` }} />
          <span style={{ color: C.teal, fontSize: 9, letterSpacing: 2 }}>RUSHAI INTELLIGENCE PLATFORM</span>
        </div>
        <Clock />
      </div>

      <div className="dash-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>

        {[
  { l: "UTILISATEURS ACTIFS", v: kpis.users.toLocaleString("fr"), c: C.blue,   ch: "+6/h" },
  { l: "REQUÊTES IA",         v: `${kpis.queries}K`,              c: C.violet, ch: "+0.15K" },
  { l: "DISPONIBILITÉ",       v: `${kpis.uptime}%`,               c: C.gold,   ch: "SLA ✓" },
  { l: "MODÈLES ACTIFS",      v: "12",                            c: C.green,  ch: "↑ stable" },
].map(k => (
  <div key={k.l} style={{ background: "#f8faff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 11px" }}>
    <div style={{ fontSize: 7, color: C.muted, letterSpacing: 1.2, marginBottom: 5 }}>{k.l}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: k.c, letterSpacing: -1, lineHeight: 1 }}>{k.v}</div>
    <div style={{ fontSize: 7.5, color: k.c, opacity: .8, marginTop: 4 }}>{k.ch}</div>
  </div>
))}
        {/* {[
          { l: "CHIFFRE D'AFFAIRES", v: `${kpis.rev}K€`, c: C.teal, ch: "+12.4%" },
          { l: "UTILISATEURS", v: kpis.users.toLocaleString("fr"), c: C.blue, ch: "+6/h" },
          { l: "REQUÊTES IA", v: `${kpis.queries}K`, c: C.violet, ch: "+0.15K" },
          { l: "DISPONIBILITÉ", v: `${kpis.uptime}%`, c: C.gold, ch: "SLA ✓" },
        ].map(k => (
          <div key={k.l} style={{ background: "#f8faff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 11px" }}>
            <div style={{ fontSize: 7, color: C.muted, letterSpacing: 1.2, marginBottom: 5 }}>{k.l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: k.c, letterSpacing: -1, lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: 7.5, color: k.c, opacity: .8, marginTop: 4 }}>{k.ch}</div>
          </div>
        ))} */}
      </div>

      <div className="dash-charts" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 10, marginBottom: 12 }}>
        <div style={{ background: "#f8faff", borderRadius: 14, padding: "12px 12px 8px", border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 8, color: C.muted, letterSpacing: 1 }}>VOLUME REQUÊTES IA (DIRECT)</span>
            <span style={{ fontSize: 8, color: C.teal }}>{lineD[lineD.length - 1].toFixed(0)}%</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 62 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.tealLt} stopOpacity=".22" />
                <stop offset="100%" stopColor={C.tealLt} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={fill} fill="url(#lg1)" />
            <polyline points={pts} fill="none" stroke={C.teal} strokeWidth="2" style={{ filter: `drop-shadow(0 0 4px ${C.tealLt}88)` }} />
            {lineD.map((v, i) => (
              <circle key={i} cx={(i / (lineD.length - 1)) * W} cy={H - (v / 100) * H} r={i === lineD.length - 1 ? 4.5 : 2.5}
                fill={i === lineD.length - 1 ? C.teal : C.tealLt}
                style={i === lineD.length - 1 ? { filter: `drop-shadow(0 0 5px ${C.tealLt})` } : { opacity: .7 }} />
            ))}
          </svg>
        </div>
        <div style={{ background: "#f8faff", borderRadius: 14, padding: "12px 12px 8px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>UTILISATION SERVICES / JOUR</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 62 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", height: `${b}%`, borderRadius: "3px 3px 2px 2px", background: i % 2 === 0 ? `linear-gradient(to top,${C.blue},${C.tealLt})` : `linear-gradient(to top,${C.tealLt}88,${C.tealLt})`, transition: "height .55s cubic-bezier(.34,1.56,.64,1)" }} />
                <span style={{ fontSize: 6.5, color: C.light }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-bottom" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
        <div style={{ background: "#f8faff", borderRadius: 14, padding: "10px 12px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>ACTIVITÉ EN TEMPS RÉEL</div>
          {feed.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 3 ? 6 : 0, opacity: 1 - i * .18, transition: "opacity .5s" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: kColor[a.k], flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: C.textSec, flex: 1 }}>{a.m}</span>
              <span style={{ fontSize: 8, color: C.muted }}>{a.t}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#f8faff", borderRadius: 14, padding: "10px 12px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 88 }}>
          <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>CHARGE IA</div>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke="#e2e8f0" strokeWidth="6" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={C.teal} strokeWidth="6"
              strokeDasharray="138" strokeDashoffset={138 - (load / 100) * 138}
              strokeLinecap="round" transform="rotate(-90 30 30)"
              style={{ transition: "stroke-dashoffset .7s ease", filter: `drop-shadow(0 0 4px ${C.tealLt}88)` }} />
            <text x="30" y="35" textAnchor="middle" fill={C.teal} fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">{Math.round(load)}%</text>
          </svg>
          <div style={{ fontSize: 8, color: C.green, marginTop: 6 }}>● Optimal</div>
        </div>
      </div>
    </div>
  );
});

export default function Dashboard() {
  return <LiveDashboard />;
}