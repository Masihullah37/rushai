
// ════════════════════════════════════════════════════════════════
// FILE: src/components/About.tsx — COMPLETE
// Dark navy blue, word-by-word scroll reveal text
// ════════════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from "react";
import { C } from "../constants/colors";

function WordReveal({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(0);
  const words = text.split(" ");
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.55)));
      setLitCount(Math.floor(progress * words.length));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [words.length]);
  return (
    <div ref={ref} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline", color: i < litCount ? C.textPrim : C.textDim, transition: "color .4s ease" }}>
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  const stack = ["Python","FastAPI","LangChain","React","Laravel","Docker","PostgreSQL","AWS","OpenAI API","HuggingFace","Redis","GitHub Actions"];
  const values = [
    { n:"01", icon:"🔐", title:"Sécurité par l'Architecture",   desc:"Déploiements on-premise, chiffrement AES-256, RGPD intégré dès la conception — jamais en option." },
    { n:"02", icon:"⚡", title:"Vélocité de Livraison",          desc:"Sprints agiles, jalons hebdomadaires. Chatbots en 1–2 semaines, RAG enterprise en 3–5 semaines." },
    { n:"03", icon:"🤝", title:"Partenariat Stratégique",        desc:"Votre équipe IA dédiée — de l'idéation au déploiement, optimisation et monitoring continu." },
    { n:"04", icon:"📈", title:"ROI Mesurable",                  desc:"KPIs définis avant la première ligne de code. Vos métriques métier sont notre critère absolu." },
  ];

  return (
    <section id="about" style={{ background: C.bgDark, padding: "clamp(80px,10vw,120px) clamp(16px,4vw,32px)", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <div className="label-chip" style={{ marginBottom: 20 }}>À Propos de RushAI</div>
          <WordReveal text="Expertise IA enterprise livrée avec précision."
            style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,60px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, marginBottom: 0 }} />
        </div>

        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.9, marginBottom: 20 }}>
              RushAI comble le fossé entre la recherche IA de pointe et le déploiement métier réel. Nous ne livrons pas des prototypes — nous mettons en production des systèmes IA sécurisés, scalables et générateurs de ROI mesurable.
            </p>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.9, marginBottom: 36 }}>
              Que vous ayez besoin de votre premier chatbot ou d'une infrastructure RAG enterprise entièrement privée — nous architecturons la bonne solution selon les standards les plus élevés.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {stack.map(t => (
                <span key={t} style={{ padding: "5px 13px", borderRadius: "100px", background: "rgba(59,130,246,.08)", border: `1px solid ${C.border}`, fontSize: 11, color: C.textSec, fontFamily: "'JetBrains Mono',monospace", transition: "all .2s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,.16)"; (e.currentTarget as HTMLElement).style.color = C.white; (e.currentTarget as HTMLElement).style.borderColor = C.blue; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,.08)"; (e.currentTarget as HTMLElement).style.color = C.textSec; (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
                >{t}</span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {values.map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 20, padding: "22px 0", borderBottom: `1px solid ${C.border}`, transition: "padding .25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "12px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.textMuted, minWidth: 30, paddingTop: 2 }}>{v.n}</span>
                <span style={{ fontSize: 18, flexShrink: 0, paddingTop: 1 }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 7 }}>{v.title}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.65 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}