
// ═══════════════════════════════════════════════════
// FILE: src/components/Dashboard.tsx
// Design: Rich dark dashboard, compelling mock data,
//         live updates, French labels, blue accents
// ═══════════════════════════════════════════════════
import { useState, useEffect, memo } from "react";
import { C } from "../constants/colors";

const Clock = memo(() => {
  const [t, setT] = useState(() => new Date().toLocaleTimeString("fr-FR"));
  useEffect(() => {
    const id = setInterval(() => setT(new Date().toLocaleTimeString("fr-FR")), 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ color: C.textMuted, fontSize: 9, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>;
});

/* ── Sparkline mini chart ── */
function Sparkline({ data, color, width = 80, height = 28 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  const fill = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#sg-${color.replace("#", "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2} r="2.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

/* ── Main chart ── */
function MainChart({ data, color }: { data: number[]; color: string }) {
  const W = 360, H = 90;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 8) - 4}`).join(" ");
  const fill = `0,${H} ${pts} ${W},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="mc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill="url(#mc-fill)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * W} cy={H - ((v - min) / range) * (H - 8) - 4}
          r={i === data.length - 1 ? 4.5 : 2.5}
          fill={i === data.length - 1 ? color : color}
          style={{ opacity: i === data.length - 1 ? 1 : .6, filter: i === data.length - 1 ? `drop-shadow(0 0 6px ${color})` : "none" }}
        />
      ))}
    </svg>
  );
}

/* ── Bar chart ── */
function BarChart({ data, colors, labels }: { data: number[]; colors: string[]; labels: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 72, paddingBottom: 20, position: "relative" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", height: `${v}%`, borderRadius: "3px 3px 2px 2px", background: `linear-gradient(to top, ${colors[i]}88, ${colors[i]})`, transition: "height .55s cubic-bezier(.34,1.56,.64,1)", boxShadow: `0 0 8px ${colors[i]}44` }} />
          <span style={{ fontSize: 6.5, color: C.textMuted, position: "absolute", bottom: 0 }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Donut ── */
function Donut({ value, color }: { value: number; color: string }) {
  const r = 22, circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
      <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={circ} strokeDashoffset={circ - dash}
        strokeLinecap="round" transform="rotate(-90 30 30)"
        style={{ transition: "stroke-dashoffset .7s ease", filter: `drop-shadow(0 0 5px ${color})` }} />
      <text x="30" y="35" textAnchor="middle" fill={color} fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">{value}%</text>
    </svg>
  );
}

export default function LiveDashboard() {
  const [lineD, setLineD] = useState([42, 55, 48, 68, 62, 78, 71, 84, 77, 92]);
  const [bars, setBars] = useState([65, 80, 55, 90, 72, 95, 68]);
  const [kpis, setKpis] = useState({
    clients: 287, requetes: 142.8, modeles: 12, uptime: 99.97,
    satisf: 98.4, econom: 47, alertes: 3, projets: 42,
  });
  const [feed, setFeed] = useState([
    { t: "maintenant", m: "Requête RAG — Nexia Corp", k: "ok" as const, detail: "23ms" },
    { t: "12s", m: "Chatbot WhatsApp déployé", k: "ok" as const, detail: "ProLogis SA" },
    { t: "28s", m: "Alerte performance modèle", k: "warn" as const, detail: "CPU 87%" },
    { t: "1m", m: "Nouveau client intégré", k: "info" as const, detail: "DataFlow SAS" },
    { t: "3m", m: "Pipeline ETL terminé", k: "ok" as const, detail: "1.2M lignes" },
  ]);
  const [load, setLoad] = useState(74);
  const [gpuLoad, setGpuLoad] = useState(58);
  const [sparklines] = useState({
    clients: [210, 225, 238, 244, 257, 263, 271, 280, 287],
    requetes: [98, 105, 112, 118, 125, 131, 136, 140, 143],
    uptime: [99.92, 99.95, 99.97, 99.96, 99.98, 99.97, 99.99, 99.97, 99.97],
  });

  useEffect(() => {
    const pool = [
      { m: "Requête RAG traitée", k: "ok" as const, detail: "18ms" },
      { m: "Session chatbot démarrée", k: "info" as const, detail: "Utilisateur #4821" },
      { m: "Appel API authentifié", k: "ok" as const, detail: "v2.1 endpoint" },
      { m: "Pipeline ETL déclenché", k: "warn" as const, detail: "750K lignes" },
      { m: "Prédiction IA servie", k: "ok" as const, detail: "Confiance 94%" },
      { m: "Nouveau client intégré", k: "info" as const, detail: "InnoTech SARL" },
      { m: "Modèle retrained", k: "ok" as const, detail: "acc: 96.8%" },
      { m: "Alerte API latence", k: "warn" as const, detail: "320ms > seuil" },
    ];
    const id = setInterval(() => {
      setLineD(d => { const nv = Math.max(20, Math.min(99, d[d.length - 1] + (Math.random() - .42) * 14)); return [...d.slice(1), nv]; });
      setBars(b => b.map(v => Math.max(22, Math.min(98, v + (Math.random() - .48) * 14))));
      setKpis(k => ({
        clients: k.clients + (Math.random() > .7 ? 1 : 0),
        requetes: +(k.requetes + Math.random() * .18).toFixed(1),
        modeles: k.modeles,
        uptime: 99.97,
        satisf: +(k.satisf + (Math.random() - .5) * .1).toFixed(1),
        econom: k.econom,
        alertes: Math.floor(Math.random() * 5),
        projets: k.projets,
      }));
      setLoad(l => Math.max(30, Math.min(96, l + (Math.random() - .5) * 10)));
      setGpuLoad(g => Math.max(25, Math.min(94, g + (Math.random() - .5) * 12)));
      setFeed(f => [{ t: "maintenant", ...pool[Math.floor(Math.random() * pool.length)] }, ...f.slice(0, 4)]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const kColor = { ok: C.green, info: C.blue, warn: C.gold };
  const days = ["L", "M", "Me", "J", "V", "S", "D"];

  const kpiCards = [
    { label: "CLIENTS ACTIFS", value: kpis.clients.toLocaleString("fr"), change: "+12 ce mois", color: C.blue, spark: sparklines.clients, trend: "↑" },
    { label: "REQUÊTES IA / JOUR", value: `${kpis.requetes}K`, change: "+0.18K/h", color: C.cyan, spark: sparklines.requetes, trend: "↑" },
    { label: "DISPONIBILITÉ SLA", value: `${kpis.uptime}%`, change: "SLA respecté ✓", color: C.green, spark: sparklines.uptime, trend: "●" },
    { label: "SATISFACTION CLIENT", value: `${kpis.satisf}%`, change: "NPS +72", color: C.violet, spark: [94, 95, 96, 97, 97.8, 98, 98.1, 98.3, kpis.satisf], trend: "↑" },
  ];

  return (
    <div style={{
      background: `linear-gradient(145deg, #0A0E1A, #0D1525)`,
      border: `1px solid ${C.border}`,
      borderRadius: 24, overflow: "hidden", padding: 22,
      fontFamily: "'JetBrains Mono',monospace",
      boxShadow: `0 24px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(59,130,246,.08)`,
      position: "relative",
    }}>
      {/* Scan line */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(transparent,rgba(59,130,246,.22),transparent)`, animation: "scanline 6s linear infinite", pointerEvents: "none", zIndex: 10 }} />
      {/* Top color bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.blue},${C.cyan},${C.violet})` }} />

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", boxShadow: `0 0 8px ${C.green}` }} />
          <span style={{ color: C.blue, fontSize: 9.5, letterSpacing: 2.5 }}>RUSHAI INTELLIGENCE PLATFORM — PRODUCTION</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: C.textMuted, fontSize: 9 }}>ENV: PROD</span>
          <Clock />
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className="dash-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {kpiCards.map(k => (
          <div key={k.label} style={{ background: "rgba(255,255,255,.033)", border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 13px", transition: "border-color .3s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = k.color + "55"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = C.border}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 6.5, color: C.textMuted, letterSpacing: 1.5, marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: k.color, letterSpacing: -1, lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: 8, color: k.color, opacity: .75, marginTop: 4 }}>{k.change}</div>
              </div>
              <Sparkline data={k.spark} color={k.color} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="dash-charts" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12, marginBottom: 12 }}>
        {/* Main line chart */}
        <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 14, padding: "14px 14px 10px", border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 1, marginBottom: 3 }}>VOLUME REQUÊTES IA — 10 DERNIERS JOURS</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.blue }}>{lineD[lineD.length - 1].toFixed(0)}K <span style={{ fontSize: 8, color: C.green }}>▲ +{Math.round((lineD[lineD.length - 1] - lineD[0]) / lineD[0] * 100)}%</span></div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 8, color: C.textMuted }}>
              <span style={{ color: C.blue }}>— Requêtes</span>
              <span style={{ color: C.cyan }}>— Modèles</span>
            </div>
          </div>
          <MainChart data={lineD} color={C.blue} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {days.map(d => (
              <span key={d} style={{ fontSize: 7, color: C.textMuted }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 14, padding: "14px 14px 8px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>UTILISATION SERVICES / JOUR</div>
          <BarChart data={bars} colors={[C.blue, C.cyan, C.blue, C.violet, C.cyan, C.blue, C.violet]} labels={days} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[["IA", C.blue], ["RAG", C.cyan], ["API", C.violet]].map(([l, c]) => (
              <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, color: C.textMuted }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c as string }} />{l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="dash-bottom" style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12 }}>
        {/* Activity feed */}
        <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 1.5, marginBottom: 10 }}>ACTIVITÉ EN TEMPS RÉEL avec des données fictives</div>
          {feed.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: i < feed.length - 1 ? 7 : 0, opacity: 1 - i * .15, transition: "opacity .5s" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: kColor[a.k], boxShadow: `0 0 6px ${kColor[a.k]}`, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: C.textPrim, flex: 1 }}>{a.m}</span>
              <span style={{ fontSize: 8, color: C.blue }}>{a.detail}</span>
              <span style={{ fontSize: 8, color: C.textMuted, minWidth: 50, textAlign: "right" }}>{a.t}</span>
            </div>
          ))}
        </div>

        {/* CPU load donut */}
        <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 100 }}>
          <div style={{ fontSize: 7.5, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>CHARGE CPU</div>
          <Donut value={Math.round(load)} color={load > 80 ? C.coral : C.blue} />
          <div style={{ fontSize: 7.5, color: C.green, marginTop: 6 }}>● Optimal</div>
        </div>

        {/* GPU load donut */}
        <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 100 }}>
          <div style={{ fontSize: 7.5, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>CHARGE GPU</div>
          <Donut value={Math.round(gpuLoad)} color={gpuLoad > 80 ? C.coral : C.cyan} />
          <div style={{ fontSize: 7.5, color: C.cyan, marginTop: 6 }}>{kpis.modeles} modèles</div>
        </div>
      </div>

      {/* ── Metrics strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 12 }}>
        {[
          { l: "PROJETS ACTIFS", v: `${kpis.projets}`, icon: "📁", color: C.blue },
          { l: "ÉCONOMIES RÉALISÉES", v: `${kpis.econom}%`, icon: "💰", color: C.green },
          { l: "ALERTES ACTIVES", v: `${kpis.alertes}`, icon: "🔔", color: kpis.alertes > 3 ? C.coral : C.gold },
          { l: "MODÈLES ACTIFS", v: `${kpis.modeles}`, icon: "🧠", color: C.violet },
        ].map(m => (
          <div key={m.l} style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "9px 12px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>{m.icon}</span>
            <div>
              <div style={{ fontSize: 6, color: C.textMuted, letterSpacing: 1 }}>{m.l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: m.color, letterSpacing: -1, lineHeight: 1.2 }}>{m.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}