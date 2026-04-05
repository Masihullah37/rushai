
// ════════════════════════════════════════════════════════════════
// FILE: src/components/Chatbot.tsx — COMPLETE
// Dark navy blue floating widget
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { C } from "../constants/colors";
import { getChatResponse } from "../utils/chatKnowledge";

interface Message { f: "user" | "ai"; t: string; }

export default function Chatbot() {
  const [open,   setOpen]   = useState(false);
  const [msgs,   setMsgs]   = useState<Message[]>([{ f:"ai", t:"Bonjour ! 👋 Je suis l'assistant RushAI. Posez-moi vos questions sur nos services, tarifs, sécurité ou délais." }]);
  const [inp,    setInp]    = useState("");
  const [typing, setTyping] = useState(false);
  const [badge,  setBadge]  = useState(1);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!inp.trim()) return;
    const u = inp.trim();
    setMsgs(m => [...m, { f:"user", t:u }]); setInp(""); setTyping(true);
    setTimeout(() => { setMsgs(m => [...m, { f:"ai", t:getChatResponse(u) }]); setTyping(false); }, 950 + Math.random() * 350);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {open && (
        <div style={{ width: "min(360px,calc(100vw-48px))", maxWidth: 360, boxSizing: "border-box" as const, height: 510, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, display: "flex", flexDirection: "column", marginBottom: 12, boxShadow: `0 24px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(59,130,246,.15)`, overflow: "hidden", animation: "slideUp .3s ease" }}>
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg,#0D1525,#111827)`, borderBottom: `1px solid ${C.border}`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: `0 0 16px rgba(59,130,246,.5)` }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: "'Syne',sans-serif" }}>Assistant RushAI</div>
              <div style={{ fontSize: 9.5, color: C.textSec, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, display: "inline-block", animation: "pulse 2s infinite" }}/>
                En ligne · Réponses instantanées
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,.08)", border: "none", color: C.textSec, fontSize: 16, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 9, background: C.bgDark }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.f==="user"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: m.f==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background: m.f==="user"?`linear-gradient(135deg,${C.blue},#1D4ED8)`:C.bgCard, fontSize: 12.5, color: C.textPrim, lineHeight: 1.6, border: m.f==="ai"?`1px solid ${C.border}`:"none", fontFamily: "'DM Sans',sans-serif", boxShadow: m.f==="ai"?`0 2px 12px rgba(0,0,0,.3)`:`0 4px 16px rgba(59,130,246,.3)`, wordBreak: "break-word" as const, animation: "fadeUp .3s ease" }}>{m.t}</div>
              </div>
            ))}
            {typing && <div style={{ display: "flex", gap: 5, padding: "9px 13px", background: C.bgCard, borderRadius: "16px 16px 16px 4px", width: "fit-content", border: `1px solid ${C.border}` }}>{[0,1,2].map(i=><div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, animation: `pulse 1.1s ${i*.22}s infinite` }}/>)}</div>}
            <div ref={bottom}/>
          </div>

          {/* Quick replies */}
          <div style={{ padding: "7px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 6, overflowX: "auto" as const, background: C.bgCard }}>
            {["Tarifs ?","Sécurité ?","Délais ?","RAG ?"].map(s => (
              <button key={s} onClick={()=>setInp(s)} style={{ background: "rgba(59,130,246,.07)", border: `1px solid ${C.border}`, borderRadius: "100px", padding: "4px 11px", fontSize: 10, color: C.textSec, whiteSpace: "nowrap" as const, transition: "all .2s", cursor: "pointer" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`rgba(59,130,246,.15)`;(e.currentTarget as HTMLElement).style.color=C.blue;(e.currentTarget as HTMLElement).style.borderColor=C.blue;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(59,130,246,.07)";(e.currentTarget as HTMLElement).style.color=C.textSec;(e.currentTarget as HTMLElement).style.borderColor=C.border;}}
              >{s}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, background: C.bgCard }}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Tapez votre message..." style={{ flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, borderRadius: 11, padding: "9px 13px", color: C.textPrim, fontSize: 12.5, outline: "none" }}/>
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg,${C.blue},#1D4ED8)`, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 14px rgba(59,130,246,.4)` }}>→</button>
          </div>
        </div>
      )}

      {/* Toggle */}
      <button onClick={()=>{ setOpen(o=>{ const n=!o; if(n) setBadge(0); return n; }); }} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: `linear-gradient(135deg,${C.blue},#1D4ED8)`, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 32px rgba(59,130,246,.5)`, transition: "transform .3s", transform: open?"rotate(20deg) scale(.92)":"scale(1)", position: "relative", cursor: "pointer" }}>
        {open ? "✕" : "💬"}
        {!open && badge > 0 && <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", animation: "pulse 1.8s infinite" }}>{badge}</div>}
      </button>
    </div>
  );
}