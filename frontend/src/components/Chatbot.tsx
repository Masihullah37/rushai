



// src/components/Chatbot.tsx
import { useState, useEffect, useRef } from "react";
import { C } from "../constants/colors";
import { getChatResponse } from "../utils/chatKnowledge";

interface Message {
  f: "user" | "ai";
  t: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([{ f: "ai", t: "Bonjour ! 👋 Je suis l'assistant RushAI. Posez-moi vos questions sur nos services, tarifs, sécurité ou délais." }]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const [badge, setBadge] = useState(1);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  useEffect(() => {
    if (open) setBadge(0);
  }, [open]);

  const send = () => {
    if (!inp.trim()) return;
    const u = inp.trim();
    setMsgs(m => [...m, { f: "user", t: u }]);
    setInp("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { f: "ai", t: getChatResponse(u) }]);
      setTyping(false);
    }, 950 + Math.random() * 350);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {open && (
        <div style={{ width: "min(348px,calc(100vw-48px))",maxWidth: 348, boxSizing: "border-box", height: 500, background: "white", border: `1.5px solid ${C.borderMd}`, borderRadius: 24, display: "flex", flexDirection: "column", marginBottom: 12, boxShadow: `0 24px 80px rgba(0,0,0,.12), 0 0 0 1px ${C.tealLt}22`, overflow: "hidden", animation: "slideUp .3s ease" }}>
          <div style={{ background: `linear-gradient(135deg,${C.teal},${C.blue})`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "'Syne',sans-serif" }}>Assistant RushAI</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#86efac", display: "inline-block", animation: "pulse 2s infinite" }} />
                En ligne · Réponses instantanées
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,.2)", border: "none", color: "white", fontSize: 16, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 9, background: "#f8faff" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.f === "user" ? "flex-end" : "flex-start" }}>

                <div style={{ 
  maxWidth: "84%", 
  padding: "10px 13px", 
  borderRadius: m.f === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", 
  background: m.f === "user" ? `linear-gradient(135deg,${C.teal},${C.blue})` : "white", 
  fontSize: 12.5, 
  color: m.f === "user" ? "white" : C.text, 
  lineHeight: 1.6, 
  border: m.f === "ai" ? `1.5px solid ${C.border}` : "none", 
  fontFamily: "'DM Sans',sans-serif", 
  boxShadow: m.f === "ai" ? "0 2px 10px rgba(0,0,0,.05)" : "none",
  // ← Ces deux lignes empêchent l'expansion
  wordBreak: "break-word" as const,
  overflowWrap: "break-word" as const,
}}>
  {m.t}
</div>
                {/* <div style={{ maxWidth: "84%", padding: "10px 13px", borderRadius: m.f === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.f === "user" ? `linear-gradient(135deg,${C.teal},${C.blue})` : "white", fontSize: 12.5, color: m.f === "user" ? "white" : C.text, lineHeight: 1.6, border: m.f === "ai" ? `1.5px solid ${C.border}` : "none", fontFamily: "'DM Sans',sans-serif", boxShadow: m.f === "ai" ? "0 2px 10px rgba(0,0,0,.05)" : "none", animation: "fadeUp .3s ease" }}>{m.t}</div> */}
              </div>
            ))}
            {typing && <div style={{ display: "flex", gap: 5, padding: "9px 13px", background: "white", borderRadius: "16px 16px 16px 4px", width: "fit-content", border: `1.5px solid ${C.border}` }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.tealLt, animation: `pulse 1.1s ${i * .22}s infinite` }} />)}
            </div>}
            <div ref={bottom} />
          </div>

          <div style={{ padding: "7px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 6, overflowX: "auto", background: "white" }}>
            {["Tarifs ?", "Sécurité ?", "Délais ?", "RAG ?"].map(s => (
              <button key={s} onClick={() => setInp(s)} style={{ background: "#f8faff", border: `1.5px solid ${C.border}`, borderRadius: 20, padding: "4px 11px", fontSize: 10, color: C.muted, whiteSpace: "nowrap", transition: "all .2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLt; e.currentTarget.style.color = C.teal; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>{s}</button>
            ))}
          </div>

          <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, background: "white" }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Tapez votre message..." style={{ flex: 1, background: "#f8faff", border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "9px 13px", color: C.text, fontSize: 12.5, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg,${C.teal},${C.blue})`, border: "none", color: "white", fontWeight: 700, fontSize: 14, boxShadow: `0 4px 12px ${C.shadow}`, cursor: "pointer" }}>→</button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(o => !o)} style={{ width: 58, height: 58, borderRadius: "50%", border: "none", background: `linear-gradient(135deg,${C.teal},${C.blue})`, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 32px ${C.shadow}`, transition: "transform .3s", transform: open ? "rotate(20deg) scale(.92)" : "scale(1)", position: "relative", cursor: "pointer" }}>
        {open ? "✕" : "💬"}
        {!open && badge > 0 && open === false && <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white", animation: "pulse 1.8s infinite" }}>{badge}</div>}
      </button>
    </div>
  );
}