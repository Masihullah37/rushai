// src/components/RAGDemo.tsx
import { useState } from "react";
import { C } from "../constants/colors";

const KB = [
  { k: ["automat", "processus", "workflow", "tâche"], a: "RushAI automatise vos processus métier de bout en bout — ingestion de données, transformation, déclencheurs de décision et reporting. Nous cartographions votre flux actuel, identifions les tâches chronophages et déployons des agents intelligents opérationnels 24h/24, 7j/7." },
  { k: ["chatbot", "assistant", "support", "client"], a: "Nos chatbots IA sont entraînés sur le contexte spécifique de votre entreprise. Ils gèrent les demandes clients, qualifient les leads, réservent des rendez-vous et escaladent les cas complexes — sur votre site, WhatsApp ou CRM. Taux de déflexion moyen : 73% des tickets traités automatiquement." },
  { k: ["sécur", "privé", "rgpd", "conformité", "chiffr"], a: "La sécurité est intégrée au niveau de l'architecture. Nous proposons des déploiements sur site, le chiffrement AES-256 au repos et en transit, le contrôle d'accès par rôles, des pistes d'audit complètes et des pipelines conformes RGPD/SOC2 par défaut. Vos données ne transitent jamais par des serveurs tiers." },
  { k: ["prix", "tarif", "coût", "budget", "invest"], a: "Notre tarification est basée sur le projet. Chatbot intégré : à partir de 3 000€, plateforme RAG : 8 000€–15 000€, déploiements enterprise : 20 000€+. Réservez un appel de découverte gratuit et nous vous enverrons une proposition détaillée sous 24h." },
  { k: ["rag", "récupér", "document", "connaissance", "privé"], a: "Nos systèmes RAG permettent à votre organisation d'interroger ses propres données — PDF, bases de données, CRM, wikis — en langage naturel. Totalement privé : aucune donnée partagée en externe. Construit avec LangChain, des bases vectorielles et un contrôle d'accès de niveau enterprise." },
  { k: ["api", "intégr", "connect", "crm", "erp"], a: "Nous développons des APIs REST et GraphQL personnalisées qui connectent vos systèmes IA aux outils existants — CRM, ERP, bases de données, plateformes SaaS. Notre architecture microservices garantit la scalabilité, le versionnement et les déploiements sans interruption." },
  { k: ["tableau", "analytique", "kpi", "rapport", "insight"], a: "Nous créons des tableaux de bord interactifs en temps réel avec Streamlit, Django ou React. Les dirigeants obtiennent une visibilité instantanée sur les KPIs, les performances des modèles et les métriques métier — tout en un seul endroit." },
  { k: ["devops", "déployer", "docker", "cicd", "cloud"], a: "Du conteneur Docker aux pipelines CI/CD GitHub Actions et à l'infrastructure cloud — nous gérons l'intégralité du cycle de déploiement. Votre application passe du code à la production sans interruption, avec rollback automatique et monitoring intégré." },
];

const respond = (q: string) => {
  const low = q.toLowerCase();
  for (const r of KB) if (r.k.some(k => low.includes(k))) return r.a;
  return "Excellente question ! Pour une réponse précise adaptée à votre projet, utilisez le formulaire de Contact ci-dessous — notre équipe répond sous 24h avec une proposition sur mesure.";
};

export default function RAGDemo() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const ask = () => {
    if (!q.trim()) return;
    setLoading(true); setAns(null);
    setTimeout(() => { setAns(respond(q)); setLoading(false); }, 1200 + Math.random() * 300);
  };

  return (
    <div style={{ background: "white", border: `1.5px solid ${C.border}`, borderRadius: 24, overflow: "hidden", boxShadow: `0 20px 60px rgba(0,0,0,.06)`, fontFamily: "'JetBrains Mono',monospace" }}>
      <div style={{ background: C.tealBg, borderBottom: `1px solid ${C.border}`, padding: "15px 22px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.teal}22,${C.blue}18)`, border: `1.5px solid ${C.tealLt}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, letterSpacing: .6 }}>Moteur d'Intelligence RAG</div>
          <div style={{ fontSize: 9.5, color: C.muted, marginTop: 2 }}>Posez n'importe quelle question sur nos services</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, background: C.greenBg, border: `1px solid ${C.green}33`, borderRadius: 20, padding: "4px 12px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 9, color: C.green }}>PRIVÉ · SÉCURISÉ</span>
        </div>
      </div>
      <div style={{ padding: "12px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: C.muted, marginRight: 2 }}>Essayez :</span>
        {["Comment fonctionne le RAG ?", "Mes données sont-elles sécurisées ?", "Intégration API ?", "Tarifs et délais", "Automatisation chatbot"].map(s => (
          <button key={s} onClick={() => setQ(s)} style={{ background: "#f8faff", border: `1px solid ${C.border}`, borderRadius: 20, padding: "4px 11px", fontSize: 9, color: C.muted, transition: "all .2s", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.teal; e.currentTarget.style.background = C.tealBg; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = "#f8faff"; }}>{s}</button>
        ))}
      </div>
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && ask()}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder="Posez votre question sur nos services IA, sécurité, tarifs, délais..."
          style={{ flex: 1, background: focused ? C.tealBg : "#f8faff", border: `1.5px solid ${focused ? C.tealLt : C.border}`, borderRadius: 12, padding: "11px 16px", color: C.text, fontSize: 12, outline: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .25s" }} />
        <button onClick={ask} style={{ padding: "11px 18px", borderRadius: 12, background: q.trim() ? `linear-gradient(135deg,${C.teal},${C.blue})` : "#f1f5f9", border: "none", color: q.trim() ? "white" : C.muted, fontWeight: 700, fontSize: 12, fontFamily: "'Syne',sans-serif", transition: "all .25s", boxShadow: q.trim() ? `0 4px 16px ${C.shadow}` : "none", cursor: "pointer" }}>DEMANDER →</button>
      </div>
      <div style={{ padding: "16px 22px", minHeight: 88 }}>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.tealLt, animation: `pulse 1.1s ${i * .22}s infinite` }} />)}</div>
            <span style={{ fontSize: 11, color: C.muted }}>Génération de la réponse intelligente...</span>
          </div>
        )}
        {ans && !loading && (
          <div style={{ animation: "slideUp .4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal},${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700 }}>IA</div>
              <span style={{ fontSize: 9, color: C.teal, letterSpacing: 1 }}>RÉPONSE RUSHAI</span>
            </div>
            <p style={{ fontSize: 12.5, color: C.textSec, lineHeight: 1.8, fontFamily: "'DM Sans',sans-serif" }}>{ans}</p>
            <div style={{ marginTop: 14, padding: "8px 14px", background: C.goldBg, border: `1px solid ${C.gold}33`, borderRadius: 10, fontSize: 10.5, color: C.gold, fontFamily: "'DM Sans',sans-serif" }}>
              💡 Vous avez un projet spécifique ? Utilisez le formulaire <strong>Contact</strong> pour une réponse sur mesure.
            </div>
          </div>
        )}
        {!loading && !ans && <p style={{ fontSize: 11, color: C.muted, fontStyle: "italic", fontFamily: "'DM Sans',sans-serif" }}>Saisissez une question ou cliquez sur une suggestion ci-dessus — je réponds instantanément.</p>}
      </div>
    </div>
  );
}