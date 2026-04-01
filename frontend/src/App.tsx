// src/App.tsx
import { useState, useEffect, useRef } from "react";
import { C, CSS } from "./constants/colors";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import RAGDemo from "./components/RAGDemo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Counter Component
function Counter({ n, suf, label, color }: { n: number; suf: string; label: string; color: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        let s = 0;
        const id = setInterval(() => {
          s += n / 55;
          if (s >= n) {
            setV(n);
            clearInterval(id);
          } else {
            setV(Math.floor(s));
          }
        }, 22);
      }
    }, { threshold: 0.3 });
    
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);
  
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 800, color, letterSpacing: -2, lineHeight: 1 }}>{v}{suf}</div>
      <div style={{ color: C.muted, fontSize: 12, marginTop: 8, letterSpacing: 0.3 }}>{label}</div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{CSS}</style>
      <Navbar />
      <Hero />
      <Services />
      
      {/* Stats Section */}
      <div style={{ padding: "clamp(48px,8vw,72px) clamp(16px,4vw,28px)", background: C.tealBg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="stat-row" style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "clamp(24px,4vw,48px)" }}>
          <Counter n={50} suf="+" label="Projets livrés" color={C.teal} />
          <Counter n={30} suf="+" label="Clients enterprise" color={C.blue} />
          <Counter n={99} suf="%" label="Taux de satisfaction" color={C.green} />
          <Counter n={10} suf="+" label="Modèles IA déployés" color={C.gold} />
          <Counter n={24} suf="h" label="Délai de réponse" color={C.teal} />
        </div>
      </div>
      
      {/* Demo Section */}
      <section id="demo" style={{ padding: "clamp(60px,10vw,120px) clamp(16px,4vw,28px)", background: C.bgSoft }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.violet, letterSpacing: 3, marginBottom: 14 }}>// DÉMONSTRATIONS INTERACTIVES</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, color: C.text, letterSpacing: -1.5, marginBottom: 16 }}>
              Vivez notre <span className="shim">Technologie</span>
            </h2>
            <p style={{ color: C.muted, fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>Entièrement interactif — pas des captures d'écran. Explorez les systèmes réels que nous créons.</p>
          </div>

          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: C.tealBg, border: `1.5px solid ${C.tealLt}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📊</div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: C.text }}>Tableau de Bord Business Intelligence Temps Réel</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>Mise à jour automatique · KPIs, graphiques, flux d'activité et charge IA</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, background: C.greenBg, border: `1px solid ${C.green}33`, borderRadius: 20, padding: "5px 14px" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 10, color: C.green, fontFamily: "'JetBrains Mono',monospace" }}>DONNÉES LIVE</span>
              </div>
            </div>
            <Dashboard />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: C.tealBg, border: `1.5px solid ${C.tealLt}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧠</div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: C.text }}>Moteur d'Intelligence RAG</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>Posez n'importe quelle question — réponse IA instantanée</div>
              </div>
            </div>
            <RAGDemo />
          </div>
        </div>
      </section>
      
      <About />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}