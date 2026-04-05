// ════════════════════════════════════════════════════════════════
// FILE: src/App.tsx — UPDATED with SEO meta injection
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { C, CSS } from "./constants/colors";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Services  from "./components/Services";
import About     from "./components/About";
import Dashboard from "./components/Dashboard";
import RAGDemo   from "./components/RAGDemo";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import Chatbot   from "./components/Chatbot";

/* ── Word-by-word section title ── */
function WordTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [lit, setLit] = useState(0);
  const words = text.split(" ");
  useEffect(() => {
    const fn = () => {
      if(!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const prog = Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight*.5)));
      setLit(Math.floor(prog*words.length));
    };
    window.addEventListener("scroll",fn,{passive:true}); fn();
    return ()=>window.removeEventListener("scroll",fn);
  },[words.length]);
  return (
    <h2 ref={ref} style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(24px,4vw,48px)", fontWeight:800, letterSpacing:-1.5, lineHeight:1.1, marginBottom:16 }}>
      {words.map((w,i)=>(
        <span key={i} style={{color:i<lit?C.white:C.textDim,transition:"color .4s ease"}}>
          {w}{i<words.length-1?" ":""}
        </span>
      ))}
    </h2>
  );
}

/* ── Privacy page (lazy) ── */
function PrivacyPage() {
  const [Comp, setComp] = useState<React.ComponentType|null>(null);
  useEffect(()=>{ import("./pages/Privacy").then(m=>setComp(()=>m.default)); },[]);
  return Comp ? <Comp/> : <div style={{padding:80,textAlign:"center",color:C.textSec,background:C.bg,minHeight:"100vh"}}>Chargement...</div>;
}

/* ── SEO meta tag injector ── */
function SEOMeta() {
  useEffect(() => {
    const title = "RushAI — Systèmes IA & Automatisation pour Entreprises";
    const desc  = "RushAI conçoit et déploie des systèmes IA sécurisés : plateformes RAG, chatbots intelligents, APIs, tableaux de bord BI et pipelines DevOps. Solutions enterprise conformes RGPD.";
    const url   = "https://rushai.pro";
    const img   = "https://rushai.pro/og-image.jpg"; 

    // Page title
    document.title = title;

    const setMeta = (selector: string, attr: string, val: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta") as HTMLMetaElement;
        document.head.appendChild(el);
      }
      (el as Element).setAttribute(attr, val);
    };

    // Basic SEO
    setMeta('meta[name="description"]',          "name",    "description");
    setMeta('meta[name="description"]',          "content", desc);
    setMeta('meta[name="keywords"]',             "name",    "keywords");
    setMeta('meta[name="keywords"]',             "content", "IA, intelligence artificielle, RAG, chatbot, automatisation, DevOps, API, RGPD, France");
    setMeta('meta[name="robots"]',               "name",    "robots");
    setMeta('meta[name="robots"]',               "content", "index, follow");
    setMeta('meta[name="author"]',               "name",    "author");
    setMeta('meta[name="author"]',               "content", "RushAI");

    // Open Graph (Facebook, WhatsApp, LinkedIn, Slack…)
    setMeta('meta[property="og:type"]',          "property","og:type");
    setMeta('meta[property="og:type"]',          "content", "website");
    setMeta('meta[property="og:url"]',           "property","og:url");
    setMeta('meta[property="og:url"]',           "content", url);
    setMeta('meta[property="og:title"]',         "property","og:title");
    setMeta('meta[property="og:title"]',         "content", title);
    setMeta('meta[property="og:description"]',   "property","og:description");
    setMeta('meta[property="og:description"]',   "content", desc);
    setMeta('meta[property="og:image"]',         "property","og:image");
    setMeta('meta[property="og:image"]',         "content", img);
    setMeta('meta[property="og:image:width"]',   "property","og:image:width");
    setMeta('meta[property="og:image:width"]',   "content", "1200");
    setMeta('meta[property="og:image:height"]',  "property","og:image:height");
    setMeta('meta[property="og:image:height"]',  "content", "630");
    setMeta('meta[property="og:site_name"]',     "property","og:site_name");
    setMeta('meta[property="og:site_name"]',     "content", "RushAI");
    setMeta('meta[property="og:locale"]',        "property","og:locale");
    setMeta('meta[property="og:locale"]',        "content", "fr_FR");

    // Twitter Card (also used by some WhatsApp parsers)
    setMeta('meta[name="twitter:card"]',         "name",    "twitter:card");
    setMeta('meta[name="twitter:card"]',         "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]',        "name",    "twitter:title");
    setMeta('meta[name="twitter:title"]',        "content", title);
    setMeta('meta[name="twitter:description"]',  "name",    "twitter:description");
    setMeta('meta[name="twitter:description"]',  "content", desc);
    setMeta('meta[name="twitter:image"]',        "name",    "twitter:image");
    setMeta('meta[name="twitter:image"]',        "content", img);
    setMeta('meta[name="twitter:site"]',         "name",    "twitter:site");
    setMeta('meta[name="twitter:site"]',         "content", "@rushai_pro");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); (canonical as HTMLLinkElement).rel = "canonical"; document.head.appendChild(canonical); }
    (canonical as HTMLLinkElement).href = url;
  }, []);
  return null;
}

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  if (path === "/confidentialite" || path === "/privacy") return <PrivacyPage />;

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.textPrim, fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{CSS}</style>
      <SEOMeta />
      <Navbar />
      <Hero />
      <Services />

      {/* ── Stats bar — neutral milestone badges ── */}
      <div style={{ padding:"clamp(48px,8vw,72px) clamp(16px,4vw,32px)", background:C.bgDark, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"clamp(20px,4vw,40px)" }}>
          {[
            { icon: "🧠", title: "Systèmes RAG",        sub: "IA connectée à vos données internes" },
  { icon: "🤖", title: "Chatbots IA",         sub: "Assistants 24/7 personnalisés" },
  { icon: "🔐", title: "IA Sécurisée",        sub: "On-premise · RGPD · données privées" },
  { icon: "⚙️", title: "Automatisation IA",   sub: "Workflows intelligents & agents" },
  { icon: "🔌", title: "API & Backend",       sub: "APIs scalables & microservices" },
  { icon: "🌐", title: "Apps & Plateformes",  sub: "Web apps modernes & dashboards" },
  { icon: "📊", title: "Data & Analytics",    sub: "Pipelines · BI · temps réel" },
  { icon: "🚀", title: "Déploiement DevOps",  sub: "CI/CD · cloud · monitoring" },
  { icon: "📈", title: "ROI Mesurable",       sub: "KPIs & optimisation continue" },
  { icon: "🌐", title: "Développement Web",   sub: "Sites modernes & performants" }
          ].map(({icon,title,sub}) => (
            <div key={title} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:10 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:`rgba(59,130,246,.1)`, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{icon}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:C.white }}>{title}</div>
              <div style={{ fontSize:12, color:C.textSec, lineHeight:1.5 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Demo section ── */}
      <section id="demo" style={{ padding:"clamp(80px,10vw,120px) clamp(16px,4vw,32px)", background:C.bg }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ marginBottom:60 }}>
            <div className="label-chip" style={{ marginBottom:20 }}>Démonstrations Interactives</div>
            <WordTitle text="Vivez notre Technologie en Temps Réel" />
            <p style={{ color:C.textSec, fontSize:15, maxWidth:480, lineHeight:1.8 }}>
              Entièrement interactif — pas des captures d'écran. Explorez les systèmes réels que nous créons.
            </p>
          </div>

          {/* Dashboard */}
          <div style={{ marginBottom:64 }}>
            <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:14, marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, flex:1 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:"rgba(59,130,246,.1)", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📊</div>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, color:C.white }}>Tableau de Bord BI Temps Réel</div>
                  <div style={{ fontSize:12, color:C.textSec }}>KPIs, graphiques, activité et charge IA — données live</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(34,197,94,.08)", border:`1px solid rgba(34,197,94,.2)`, borderRadius:"100px", padding:"5px 14px" }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:C.green, animation:"pulse 1.5s infinite" }}/>
                <span style={{ fontSize:10, color:C.green, fontFamily:"'JetBrains Mono',monospace" }}>DONNÉES LIVE</span>
              </div>
            </div>
            <Dashboard />
          </div>

          {/* RAG Demo */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"rgba(59,130,246,.1)", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🧠</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, color:C.white }}>Moteur d'Intelligence RAG</div>
                <div style={{ fontSize:12, color:C.textSec }}>Posez n'importe quelle question — réponse IA instantanée</div>
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