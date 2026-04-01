// src/components/About.tsx
import { C } from "../constants/colors";

export default function About() {
  return (
    <section id="about" style={{ padding: "clamp(60px,10vw,120px) clamp(16px,4vw,28px)", background: "white", borderTop: `1px solid ${C.border}` }}>
      <div className="two-col" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,6vw,80px)", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.green, letterSpacing: 3, marginBottom: 14 }}>// À PROPOS DE RUSHAI</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 800, color: C.text, marginBottom: 22, letterSpacing: -1.2, lineHeight: 1.15 }}>
            Expertise IA enterprise<br /><span className="shim">livrée avec précision.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.85, marginBottom: 18 }}>RushAI comble le fossé entre la recherche IA de pointe et le déploiement métier réel. Nous ne livrons pas des prototypes — nous mettons en production des systèmes IA sécurisés, scalables et générateurs de ROI mesurable.</p>
          <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.85, marginBottom: 30 }}>Que vous ayez besoin de votre premier chatbot ou d'une infrastructure RAG enterprise entièrement privée — nous architecturons la bonne solution et la déployons selon les standards les plus élevés.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Python", "FastAPI", "LangChain", "React", "Laravel", "Docker", "PostgreSQL", "AWS", "OpenAI API", "HuggingFace", "Redis", "GitHub Actions"].map(t => (
              <span key={t} style={{ padding: "5px 13px", borderRadius: 20, background: C.tealBg, border: `1.5px solid ${C.tealLt}33`, fontSize: 11, color: C.teal, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { i: "🔐", c: C.violet, bg: C.violetBg, t: "Sécurité par l'Architecture", d: "Déploiements on-premise, chiffrement AES-256, conformité RGPD intégrée dès la conception — jamais en option." },
            { i: "⚡", c: C.teal, bg: C.tealBg, t: "Vélocité de Livraison", d: "Sprints agiles avec jalons hebdomadaires. Chatbots en 1–2 semaines, plateformes RAG en 3–5 semaines." },
            { i: "🤝", c: C.green, bg: C.greenBg, t: "Partenariat Stratégique", d: "Nous devenons votre équipe IA — de l'idéation au déploiement, à l'optimisation et au monitoring continu." },
            { i: "📈", c: C.gold, bg: C.goldBg, t: "ROI Mesurable", d: "KPIs définis avant la première ligne de code. Vos métriques métier sont notre critère de livraison absolu." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "#f8faff", borderRadius: 16, border: `1.5px solid ${C.border}`, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = item.c + "55"; e.currentTarget.style.background = item.bg; e.currentTarget.style.boxShadow = `0 6px 24px ${item.c}18`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "#f8faff"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: item.bg, border: `1.5px solid ${item.c}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{item.i}</div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 5 }}>{item.t}</div>
                <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}