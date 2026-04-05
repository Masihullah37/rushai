
// ════════════════════════════════════════════════════════════════
// FILE: src/components/Footer.tsx — COMPLETE
// Dark navy, all functional navigation links
// ════════════════════════════════════════════════════════════════
import { C } from "../constants/colors";
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer style={{ background: C.bgDark, padding: "clamp(56px,8vw,80px) clamp(16px,4vw,32px) 32px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(28px,4vw,52px)", marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px rgba(59,130,246,.4)` }}>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 900, fontFamily: "'Syne',sans-serif" }}>R</span>
              </div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: C.white }}>RushAI</span>
            </div>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.82, maxWidth: 240, marginBottom: 20 }}>
              Spécialiste en Systèmes IA & Automatisation. Solutions sécurisées, scalables et orientées ROI pour les entreprises.
            </p>
            <a href="mailto:contact@rushai.pro" style={{ fontSize: 13, color: C.blue, display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=C.cyan;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=C.blue;}}>
              📧 contact@rushai.pro
            </a>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted, marginBottom: 18, letterSpacing: 1.5 }}>SERVICES</div>
            {[["IA & RAG","services"],["Chatbots","services"],["Développement API","services"],["Tableaux BI","services"],["DevOps","services"],["Conseil IA","services"]].map(([l,id])=>(
              <button key={l} onClick={()=>go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.textMuted, marginBottom: 10, textAlign: "left", padding: 0, transition: "color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=C.blue;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=C.textMuted;}}>{l}</button>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted, marginBottom: 18, letterSpacing: 1.5 }}>NAVIGATION</div>
            {[["Accueil","home"],["Services","services"],["Démo Live","demo"],["Moteur RAG","demo"],["À Propos","about"],["Contact","contact"]].map(([l,id])=>(
              <button key={l} onClick={()=>go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.textMuted, marginBottom: 10, textAlign: "left", padding: 0, transition: "color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=C.white;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=C.textMuted;}}>{l}</button>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.textMuted, marginBottom: 18, letterSpacing: 1.5 }}>LÉGAL</div>
            {[["Politique de Confidentialité","/confidentialite"]].map(([l,href])=>(
              <a key={l} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 13, color: C.textMuted, marginBottom: 10, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=C.white;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=C.textMuted;}}>{l}</a>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${C.border},transparent)`, marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>
            © 2026 RushAI. Tous droits réservés. — Données conservées pour le temps nécessaire , RGPD conforme.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textMuted }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }}/>
            Tous systèmes opérationnels
          </div>
        </div>
      </div>
    </footer>
  );
}


// ════════════════════════════════════════════════════════════════
// FILE: src/pages/Privacy.tsx — COMPLETE RGPD policy (dark theme)
// ════════════════════════════════════════════════════════════════
// export default function Privacy() { ... }
// (see Privacy.tsx output file)