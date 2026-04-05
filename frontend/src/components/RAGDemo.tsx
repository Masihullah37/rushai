

// ════════════════════════════════════════════════════════════════
// FILE: src/components/RAGDemo.tsx — COMPLETE
// Dark terminal aesthetic matching blue theme
// ════════════════════════════════════════════════════════════════
import { useState } from "react";
import { C } from "../constants/colors";

const KB = [
  { k:["automat","processus","workflow","tâche"], a:"RushAI automatise vos processus métier de bout en bout — ingestion de données, transformation, déclencheurs de décision et reporting. Nous déployons des agents intelligents opérationnels 24h/24, 7j/7." },
  { k:["chatbot","assistant","support","client"], a:"Nos chatbots IA sont entraînés sur le contexte spécifique de votre entreprise. Ils gèrent les demandes clients, qualifient les leads, réservent des rendez-vous — sur votre site, WhatsApp ou CRM. Taux de déflexion moyen : 73%." },
  { k:["sécur","privé","rgpd","conformité","chiffr"], a:"La sécurité est intégrée au niveau de l'architecture. Déploiements sur site, chiffrement AES-256, contrôle d'accès par rôles, pistes d'audit complètes et pipelines conformes RGPD/SOC2. Vos données ne transitent jamais par des serveurs tiers." },
  { 
  k: ["projet", "investissement", "accompagnement", "solution", "devis"], 
  a: "Chaque projet est unique et fait l'objet d'un accompagnement sur mesure. Chatbot sur mesure, plateforme RAG ou déploiement enterprise : nos solutions s'adaptent à vos besoins spécifiques. Réservez un appel de découverte gratuit — vous recevrez une proposition personnalisée dans les meilleurs délais." 
},
  { k:["rag","récupér","document","connaissance"], a:"Nos systèmes RAG permettent à votre organisation d'interroger ses propres données — PDF, bases de données, CRM, wikis — en langage naturel. 100% privé, zéro partage externe. Construit avec LangChain, bases vectorielles et contrôle d'accès enterprise." },
  { k:["api","intégr","connect","crm","erp"], a:"Nous développons des APIs REST et GraphQL personnalisées qui connectent vos systèmes IA aux outils existants — CRM, ERP, bases de données, plateformes SaaS. Architecture microservices pour la scalabilité." },
  { k:["tableau","analytique","kpi","rapport"], a:"Tableaux de bord interactifs temps réel — Streamlit, Django ou React. Visibilité instantanée sur les KPIs, les performances des modèles IA et les métriques métier, tout en un seul endroit." },
  { k:["devops","déployer","docker","cicd","cloud"], a:"Du conteneur Docker aux pipelines CI/CD GitHub Actions et à l'infrastructure cloud — nous gérons l'intégralité du cycle de déploiement. Production sans interruption, rollback automatique et monitoring intégré." },
];
const respond = (q:string) => {
  const low = q.toLowerCase();
  for(const r of KB) if(r.k.some(k=>low.includes(k))) return r.a;
  return "Excellente question ! Pour une réponse précise adaptée à votre projet, utilisez le formulaire Contact — notre équipe répond sous 24h avec une proposition sur mesure.";
};

export default function RAGDemo() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const ask = () => {
    if(!q.trim()) return;
    setLoading(true); setAns(null);
    setTimeout(()=>{ setAns(respond(q)); setLoading(false); }, 1100+Math.random()*300);
  };

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", fontFamily: "'JetBrains Mono',monospace", boxShadow: `0 8px 40px rgba(0,0,0,.5)` }}>
      {/* macOS traffic lights header */}
      <div style={{ background: "rgba(255,255,255,.03)", borderBottom: `1px solid ${C.border}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }}/>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28CA41" }}/>
        </div>
        <span style={{ color: C.textMuted, fontSize: 11, letterSpacing: 1 }}>rushai — moteur-rag — bash</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }}/>
          <span style={{ fontSize: 9, color: C.green }}>PRIVÉ · SÉCURISÉ</span>
        </div>
      </div>

      {/* Suggestion pills */}
      <div style={{ padding: "11px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: C.textMuted, marginRight: 4 }}>$ suggestions:</span>
        {["Comment fonctionne le RAG ?","Données sécurisées ?","Intégration API ?","Tarifs et délais","Chatbot automatisé"].map(s=>(
          <button key={s} onClick={()=>setQ(s)} style={{ background: "rgba(59,130,246,.07)", border: `1px solid ${C.border}`, borderRadius: "100px", padding: "4px 12px", fontSize: 9, color: C.textSec, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.blue;(e.currentTarget as HTMLElement).style.color=C.blue;(e.currentTarget as HTMLElement).style.background="rgba(59,130,246,.14)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.border;(e.currentTarget as HTMLElement).style.color=C.textSec;(e.currentTarget as HTMLElement).style.background="rgba(59,130,246,.07)";}}
          >{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,.05)", border: `1px solid ${focused ? C.blue : C.border}`, borderRadius: 10, padding: "11px 16px", transition: "border-color .25s" }}>
          <span style={{ color: C.blue, fontSize: 12 }}>$</span>
          <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
            placeholder="Posez votre question sur nos services IA..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.textPrim, fontSize: 12.5, fontFamily: "'JetBrains Mono',monospace" }}
          />
        </div>
        <button onClick={ask} style={{ padding: "11px 20px", borderRadius: 10, background: q.trim()?`linear-gradient(135deg,${C.blue},#1D4ED8)`:"rgba(255,255,255,.05)", border: "none", color: q.trim()?"#fff":C.textMuted, fontWeight: 600, fontSize: 12.5, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", boxShadow: q.trim()?`0 4px 16px rgba(59,130,246,.4)`:"none" }}>
          ↵ Envoyer
        </button>
      </div>

      {/* Answer */}
      <div style={{ padding: "18px 20px", minHeight: 88 }}>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i=><div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, animation: `pulse 1.1s ${i*.22}s infinite` }}/>)}</div>
            <span style={{ fontSize: 11, color: C.textMuted }}>Traitement de la requête...</span>
          </div>
        )}
        {ans && !loading && (
          <div style={{ animation: "slideUp .4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ color: C.blue }}>▶</span>
              <span style={{ fontSize: 9.5, color: C.blue, letterSpacing: 1 }}>RÉPONSE RUSHAI</span>
            </div>
            <p style={{ fontSize: 13.5, color: C.textSec, lineHeight: 1.82, fontFamily: "'DM Sans',sans-serif" }}>{ans}</p>
            <div style={{ marginTop: 14, padding: "8px 14px", background: "rgba(59,130,246,.08)", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 11.5, color: C.blue, fontFamily: "'DM Sans',sans-serif" }}>
              💡 Projet spécifique ? Utilisez le formulaire <strong>Contact</strong> pour une réponse personnalisée sous 24h.
            </div>
          </div>
        )}
        {!loading && !ans && <p style={{ fontSize: 11.5, color: C.textMuted, fontStyle: "italic", fontFamily: "'DM Sans',sans-serif" }}>Saisissez une question ou cliquez sur une suggestion ci-dessus...</p>}
      </div>
    </div>
  );
}