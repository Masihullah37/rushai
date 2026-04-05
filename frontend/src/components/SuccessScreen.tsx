

// ════════════════════════════════════════════════════════════════
// FILE: src/components/SuccessScreen.tsx — COMPLETE
// ════════════════════════════════════════════════════════════════
import { C } from "../constants/colors";
interface Props { name: string; email: string; onReset: () => void; }

export default function SuccessScreen({ name, email, onReset }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "36px 24px", position: "relative", overflow: "hidden" }}>
      {[0,1,2].map(i=><div key={i} style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 110, height: 110, borderRadius: "50%", border: `2px solid rgba(59,130,246,.35)`, animation: `ringOut 2.2s ${i*.55}s ease-out infinite`, pointerEvents: "none" }}/>)}
      <div style={{ position: "relative", zIndex: 2, width: 88, height: 88, borderRadius: "50%", background: "rgba(59,130,246,.1)", border: `2px solid rgba(59,130,246,.4)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", animation: "bounce .7s cubic-bezier(.34,1.56,.64,1) forwards", boxShadow: `0 0 40px rgba(59,130,246,.4)` }}>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="21" r="19" stroke={C.blue} strokeWidth="1.5"/>
          <polyline points="11,22 18,29 31,14" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: C.white, marginBottom: 12, animation: "fadeUp .5s .4s ease forwards", opacity: 0 }}>Message envoyé ! 🎉</div>
      <div style={{ color: C.textSec, fontSize: 14, lineHeight: 1.85, marginBottom: 8, animation: "fadeUp .5s .55s ease forwards", opacity: 0 }}>
        Merci, <strong style={{ color: C.white }}>{name}</strong>.<br/>Confirmation envoyée à <strong style={{ color: C.blue }}>{email}</strong>
      </div>
      <div style={{ color: C.textSec, fontSize: 13, lineHeight: 1.85, animation: "fadeUp .5s .68s ease forwards", opacity: 0 }}>
        Notre équipe (<strong style={{ color: C.white }}>contact@rushai.pro</strong>) vous répond sous <strong style={{ color: C.blue }}>24h</strong>.
      </div>
      <div style={{ marginTop: 24, padding: "16px 18px", background: "rgba(59,130,246,.07)", border: `1px solid ${C.border}`, borderRadius: 14, animation: "fadeUp .5s .82s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>PROCHAINES ÉTAPES</div>
        {["📧 Email de confirmation envoyé","👀 Analyse de votre brief projet","💡 Proposition personnalisée","📞 Appel de découverte sous 24h"].map((s,i)=>(
          <div key={i} style={{ fontSize: 12.5, color: C.textSec, marginBottom: i<3?7:0, textAlign: "left", display: "flex", gap: 8, lineHeight: 1.6 }}>{s}</div>
        ))}
      </div>
      <button onClick={onReset} style={{ marginTop: 20, padding: "10px 22px", borderRadius: "100px", background: "transparent", border: `1px solid ${C.border}`, color: C.textSec, fontSize: 13, cursor: "pointer", animation: "fadeUp .5s 1s ease forwards", opacity: 0 }}>
        ← Envoyer un autre message
      </button>
    </div>
  );
}