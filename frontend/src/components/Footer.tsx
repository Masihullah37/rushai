// src/components/Footer.tsx
import { C } from "../constants/colors";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "clamp(36px,6vw,52px) clamp(16px,4vw,28px) clamp(24px,4vw,36px)", background: "#f0f7ff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr", gap: "clamp(24px,4vw,48px)", marginBottom: 44 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>
              <span style={{ background: `linear-gradient(135deg,${C.teal},${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rush</span>
              <span style={{ color: C.text }}>AI</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, maxWidth: 250 }}>Spécialiste en Systèmes IA & Automatisation. Création de solutions IA sécurisées, d'automatisations intelligentes et de systèmes de données scalables pour les entreprises du monde entier.</p>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.teal, fontWeight: 600 }}>
              <span>📧</span><span>info@rushai.pro</span>
            </div>
          </div>
          {[
            { t: "Services", ls: ["IA & RAG", "Chatbots", "Développement API", "Tableaux de Bord BI", "DevOps", "Conseil IA"] },
            { t: "Solutions", ls: ["IA Enterprise", "Sécurité des Données", "Automatisation", "Ingénierie des Données"] },
            { t: "Entreprise", ls: ["À Propos", "Contact", "Politique de Confidentialité", "Conditions d'Utilisation"] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11.5, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: 1 }}>{col.t.toUpperCase()}</div>
              {col.ls.map(l => (
                <div key={l} style={{ fontSize: 13, color: C.muted, marginBottom: 9, transition: "color .2s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.teal}
                  onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12.5, color: C.muted }}>© 2025 RushAI — Tous droits réservés.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: C.muted }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            Tous les systèmes opérationnels
          </div>
        </div>
      </div>
    </footer>
  );
}