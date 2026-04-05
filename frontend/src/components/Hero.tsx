// ════════════════════════════════════════════════════════════════
// FILE: src/components/Hero.tsx — FIXED v2
// Fixes: exigeantes clipping, EN/FR layout shift, no stats numbers
// ════════════════════════════════════════════════════════════════
import { memo, useState, useEffect, useRef, Suspense, lazy } from "react";
import { C } from "../constants/colors";

const JellySphere = lazy(() => import("./JellySphere"));

function TW({ words }: { words: string[] }) {
  const [txt, setTxt] = useState(words[0]);
  const [wi, setWi] = useState(0);
  const [ci, sCi] = useState(words[0].length);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const id = setTimeout(() => {
      if (!del) {
        setTxt(w.slice(0, ci + 1));
        if (ci + 1 === w.length) setTimeout(() => setDel(true), 2100);
        else sCi(c => c + 1);
      } else {
        setTxt(w.slice(0, ci - 1));
        if (ci === 0) { setDel(false); setWi(i => (i + 1) % words.length); }
        else sCi(c => c - 1);
      }
    }, del ? 28 : 65);
    return () => clearTimeout(id);
  }, [ci, del, wi, words]);
  return (
    <span style={{ background: `linear-gradient(90deg,#fff,${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {txt}<span style={{ animation: "blink 1s infinite", WebkitTextFillColor: C.blue }}>|</span>
    </span>
  );
}

const Particles = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const pts = useRef<Array<{ x: number; y: number; vx: number; vy: number; r: number }>>([]);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let W = cv.width = cv.offsetWidth, H = cv.height = cv.offsetHeight;
    pts.current = Array.from({ length: 55 }, () => ({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, r:Math.random()*1.2+.3 }));
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.current.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
        const d=Math.hypot(p.x-mouse.current.x,p.y-mouse.current.y);
        if(d<120&&d>0){p.vx+=(p.x-mouse.current.x)/d*.025;p.vy+=(p.y-mouse.current.y)/d*.025;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle="rgba(59,130,246,.4)"; ctx.fill();
      });
      for(let i=0;i<pts.current.length;i++) for(let j=i+1;j<pts.current.length;j++){
        const dx=pts.current[i].x-pts.current[j].x,dy=pts.current[i].y-pts.current[j].y;
        const d=Math.hypot(dx,dy);
        if(d<90){ctx.beginPath();ctx.moveTo(pts.current[i].x,pts.current[i].y);ctx.lineTo(pts.current[j].x,pts.current[j].y);ctx.strokeStyle=`rgba(59,130,246,${.1*(1-d/90)})`;ctx.lineWidth=.5;ctx.stroke();}
      }
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    const onM=(e:MouseEvent)=>{const r=cv.getBoundingClientRect();mouse.current={x:e.clientX-r.left,y:e.clientY-r.top};};
    const onR=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;};
    window.addEventListener("mousemove",onM); window.addEventListener("resize",onR);
    return ()=>{if(raf.current)cancelAnimationFrame(raf.current);window.removeEventListener("mousemove",onM);window.removeEventListener("resize",onR);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.4,pointerEvents:"none"}}/>;
});

function FloatBadge({pos,icon,label,sub,anim}:{pos:Record<string,string|undefined>;icon:string;label:string;sub:string;anim:string}) {
  const fp=Object.fromEntries(Object.entries(pos).filter(([,v])=>v!==undefined)) as Record<string,string>;
  return (
    <div style={{position:"absolute",...fp,background:"rgba(13,21,37,0.88)",border:`1px solid rgba(59,130,246,.3)`,backdropFilter:"blur(16px)",borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,animation:anim,boxShadow:`0 8px 32px rgba(0,0,0,.5)`,zIndex:4,minWidth:152}}>
      <div style={{width:34,height:34,borderRadius:10,background:"rgba(59,130,246,.12)",border:`1px solid rgba(59,130,246,.25)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{icon}</div>
      <div>
        <div style={{fontSize:11.5,fontWeight:600,color:"#F1F5F9",fontFamily:"'DM Sans',sans-serif"}}>{label}</div>
        <div style={{fontSize:9.5,color:C.blue,marginTop:2}}>{sub}</div>
      </div>
    </div>
  );
}

function Ticker() {
  const items=["Systèmes IA Sécurisés","Plateformes RAG","Chatbots Intelligents","Pipelines de Données","APIs Performantes","Automatisation","DevOps & CI/CD","Tableaux de Bord BI"];
  const doubled=[...items,...items];
  return (
    <div style={{overflow:"hidden",borderTop:`1px solid ${C.border}`,padding:"12px 0",background:"rgba(6,10,20,.9)"}}>
      <div style={{display:"flex",gap:48,animation:"marqueeL 22s linear infinite",width:"max-content"}}>
        {doubled.map((item,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.textSec,letterSpacing:1.5,textTransform:"uppercase" as const,whiteSpace:"nowrap" as const}}>
            <span style={{color:C.blue}}>✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const badges=[
    {pos:{top:"8%",left:"-8%"},  icon:"🔐",label:"IA Privée",   sub:"On-premise",       anim:"floatY 4.5s ease-in-out infinite"},
    {pos:{top:"8%",right:"-8%"}, icon:"⚡",label:"CI/CD Rapide",sub:"GitHub Actions",    anim:"floatY 4s .8s ease-in-out infinite"},
    {pos:{bottom:"8%",left:"-8%"},icon:"📊",label:"Tableaux BI", sub:"KPIs temps réel",  anim:"floatY 5s 1.5s ease-in-out infinite"},
    {pos:{bottom:"8%",right:"-8%"},icon:"🤖",label:"Chatbots IA",sub:"Automatisation 24/7",anim:"floatY 3.8s .4s ease-in-out infinite"},
  ];

  /* Key font-size: use clamp so both FR and EN fit without overflow */
  const fs = "clamp(38px,6.8vw,86px)";

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%,100%{ box-shadow:0 6px 28px rgba(59,130,246,.4); }
          50%    { box-shadow:0 10px 48px rgba(59,130,246,.65); }
        }
        /* The key fix — typewriter container uses min-height not fixed height */
        .tw-wrap {
          /* enough room for tallest word in any language */
          min-height: clamp(46px,7.5vw,98px);
          line-height: 1.02;
          /* NEVER clip — g y p descenders must show */
          overflow: visible;
          padding-bottom: 0.08em;
          display: block;
        }
        /* Subline — make sure "exigeantes" g is fully visible */
        .hero-sub {
          overflow: visible;
          padding-bottom: 0.12em;
          line-height: 1.05;
        }
        @media(max-width:960px){
          .hero-grid{grid-template-columns:1fr !important;}
          .hero-right-col{display:none !important;}
        }
      `}</style>

      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",paddingTop:68,overflow:"hidden",background:"linear-gradient(180deg,#060A14 0%,#0A0E1A 45%,#0D1525 100%)"}}>
        <div style={{position:"absolute",top:"-5%",left:"50%",transform:"translateX(-50%)",width:"80%",height:"60%",background:"radial-gradient(ellipse at 50% 0%,rgba(59,130,246,.38) 0%,transparent 65%)",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(59,130,246,.05) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none"}}/>
        <Particles/>

        <div className="hero-grid" style={{maxWidth:1200,margin:"0 auto",padding:"clamp(60px,10vw,100px) clamp(16px,4vw,32px)",display:"grid",gridTemplateColumns:"minmax(0,1.2fr) minmax(0,1fr)",gap:"clamp(30px,5vw,60px)",alignItems:"center",position:"relative",zIndex:2,width:"100%"}}>

          {/* LEFT */}
          <div style={{minWidth:0}}>
            <div className="fu fu1 label-chip" style={{marginBottom:22}}>Spécialiste IA &amp; Automatisation</div>

            {/* Static "Nous créons" */}
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:fs,fontWeight:800,letterSpacing:-2.5,color:C.white,lineHeight:1.02,margin:0,marginBottom:"0.03em",overflow:"visible"}}>
              Nous<br/>créons
            </h1>

            {/* Typewriter — min-height prevents layout shift, overflow:visible shows full glyphs */}
            <div className="tw-wrap fu fu2" style={{fontFamily:"'Syne',sans-serif",fontSize:fs,fontWeight:800,letterSpacing:-2.5}}>
              <TW words={["des systèmes IA.","des plateformes RAG.","des chatbots.","des pipelines.","des APIs."]}/>
            </div>

            {/* Subline — overflow visible so g in exigeantes shows fully */}
            <div className="hero-sub fu fu3" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4.8vw,64px)",fontWeight:700,letterSpacing:-1.5,color:C.textSec,marginBottom:"clamp(16px,2.5vw,28px)"}}>
              pour entreprises exigeantes.
            </div>

            <p className="fu fu4" style={{fontSize:"clamp(14px,1.8vw,16px)",color:C.textSec,lineHeight:1.85,marginBottom:"clamp(24px,4vw,36px)",maxWidth:490}}>
              De l'IA privée entraînée sur vos données à un déploiement DevOps complet — nous transformons vos données en solutions intelligentes, sécurisées et automatisées.
            </p>

            {/* CTAs */}
            <div className="fu fu5" style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:"clamp(24px,4vw,36px)"}}>
              <a href="#contact" onClick={e=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});}} style={{padding:"14px 32px",borderRadius:10,background:`linear-gradient(135deg,${C.blue},#1D4ED8)`,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:15,textDecoration:"none",display:"inline-block",boxShadow:`0 6px 28px rgba(59,130,246,.4)`,animation:"pulseGlow 3s infinite",transition:"transform .2s"}}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform=""}>Consultation gratuite →</a>
              <a href="#demo" onClick={e=>{e.preventDefault();document.getElementById("demo")?.scrollIntoView({behavior:"smooth"});}} style={{padding:"14px 28px",borderRadius:10,background:"transparent",color:C.textPrim,border:`1px solid rgba(59,130,246,.3)`,fontFamily:"'DM Sans',sans-serif",fontWeight:400,fontSize:15,textDecoration:"none",display:"inline-block",transition:"background .2s,border-color .2s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(59,130,246,.08)";(e.currentTarget as HTMLElement).style.borderColor=C.blue;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.borderColor="rgba(59,130,246,.3)";}}>Voir les démos ↓</a>
            </div>

            {/* ── Replaced stats with neutral professional badges ── */}
            <div className="fu fu6" style={{display:"flex",flexWrap:"wrap",gap:"clamp(10px,2vw,18px)",paddingTop:20,borderTop:`1px solid ${C.border}`}}>
              {[
                {text:"Livraison rapide"},
                {text:"Sécurité enterprise"},
                {text:"Conforme RGPD"},
              ].map(({text})=>(
                <div key={text} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 14px",borderRadius:"100px",background:"rgba(59,130,246,.07)",border:`1px solid ${C.border}`}}>
                  {/* <span style={{fontSize:14}}>{icon}</span> */}
                  <span style={{fontSize:12,color:C.textSec,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap" as const}}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Jelly Sphere */}
          <div className="hero-right-col" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"clamp(280px,40vw,460px)",overflow:"visible"}}>
            <div style={{position:"absolute",width:"70%",height:"70%",borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,.18) 0%,transparent 70%)",filter:"blur(30px)",pointerEvents:"none"}}/>
            <Suspense fallback={<div style={{width:"clamp(200px,35vw,360px)",aspectRatio:"1/1",borderRadius:"50%",background:"radial-gradient(circle,rgba(181,217,50,.1) 0%,transparent 70%)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:56,height:56,borderRadius:"50%",border:`2px solid ${C.blue}`,borderTopColor:"transparent",animation:"spin 1s linear infinite"}}/></div>}>
              <div style={{width:"clamp(220px,35vw,380px)",aspectRatio:"1/1"}}>
                <JellySphere size={380}/>
              </div>
            </Suspense>
            {badges.map((b,i)=><FloatBadge key={i} {...b}/>)}
          </div>
        </div>
      </section>
      <Ticker/>
    </>
  );
}