// src/components/SuccessScreen.tsx
import { C } from "../constants/colors";

interface SuccessScreenProps {
  name: string;
  email: string;
  onReset: () => void;
}

export default function SuccessScreen({ name, email, onReset }: SuccessScreenProps) {
  return (
    <div style={{ textAlign: "center", padding: "36px 24px", position: "relative", overflow: "hidden" }}>
      {[0, 1, 2].map(i => <div key={i} style={{ position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)", width: 110, height: 110, borderRadius: "50%", border: `2px solid ${C.tealLt}66`, animation: `ringOut 2.2s ${i * .55}s ease-out infinite`, pointerEvents: "none" }} />)}
      <div style={{ position: "relative", zIndex: 2, width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal}22,${C.blue}18)`, border: `2px solid ${C.tealLt}88`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", animation: "successBounce .7s cubic-bezier(.34,1.56,.64,1) forwards", boxShadow: `0 0 36px ${C.tealLt}55` }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke={C.teal} strokeWidth="2" />
          <polyline points="12,23 19,30 32,15" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.teal, marginBottom: 12, animation: "fadeUp .5s .4s ease forwards", opacity: 0 }}>Message envoyé ! 🎉</div>
      <div style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.85, marginBottom: 8, animation: "fadeUp .5s .55s ease forwards", opacity: 0 }}>
        Merci, <strong style={{ color: C.text }}>{name}</strong>.<br />
        Une confirmation a été envoyée à <strong style={{ color: C.teal }}>{email}</strong>
      </div>
      <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.85, animation: "fadeUp .5s .68s ease forwards", opacity: 0 }}>
        Notre équipe (<strong style={{ color: C.text }}>info@rushai.pro</strong>) analysera votre projet<br />et vous enverra une proposition détaillée sous <strong style={{ color: C.gold }}>24 heures</strong>.
      </div>
      <div style={{ marginTop: 24, padding: "14px 18px", background: C.tealBg, border: `1px solid ${C.border}`, borderRadius: 14, animation: "fadeUp .5s .82s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>PROCHAINES ÉTAPES</div>
        {["📧 Email de confirmation envoyé dans votre boîte", "👀 Notre équipe étudie votre brief projet", "💡 Élaboration d'une proposition personnalisée", "📞 Appel de découverte planifié sous 24h"].map((s, i) => (
          <div key={i} style={{ fontSize: 12, color: C.textSec, marginBottom: i < 3 ? 6 : 0, textAlign: "left", display: "flex", gap: 8, lineHeight: 1.6 }}>{s}</div>
        ))}
      </div>
      <button onClick={onReset} style={{ marginTop: 20, padding: "10px 22px", borderRadius: 12, background: "white", border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 13, fontFamily: "'DM Sans',sans-serif", animation: "fadeUp .5s 1s ease forwards", opacity: 0, cursor: "pointer" }}>← Envoyer un autre message</button>
    </div>
  );
}