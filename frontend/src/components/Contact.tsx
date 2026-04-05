
// ════════════════════════════════════════════════════════════════
// FILE: src/components/Contact.tsx — COMPLETE
// Dark navy blue, GDPR consent checkbox, multi-step form
// ════════════════════════════════════════════════════════════════
import { useState } from "react";
import { C } from "../constants/colors";
import SuccessScreen from "./SuccessScreen";

const STEPS = [
  { f:"name",    label:"Votre nom complet",              ph:"katfan",                                       type:"text",     icon:"👤" },
  { f:"email",   label:"Email professionnel",             ph:"abc@entreprise.fr",                               type:"email",    icon:"📧" },
  { f:"subject", label:"Type de projet",                  ph:"Chatbot IA / Plateforme RAG / Tableau de bord...",  type:"text",     icon:"🎯" },
  { f:"message", label:"Décrivez votre projet",           ph:"Défi métier, stack actuel, délais et résultats attendus...", type:"textarea", icon:"✍️" },
];

export default function Contact() {
  const [step,    setStep]    = useState(0);
  const [form,    setForm]    = useState({ name:"", email:"", subject:"", message:"" });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string|null>(null);
  const [consent, setConsent] = useState(false);
  const cur = STEPS[step];

  const sendEmail = async () => {
    if (!consent) { alert("Veuillez accepter la politique de confidentialité avant d'envoyer."); return; }
    setSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...form, consent: true }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Erreur d'envoi"); }
      setSent(true);
    } catch(err:unknown) {
      alert(`Erreur: ${err instanceof Error ? err.message : "Inconnue"}`);
    } finally { setSending(false); }
  };

  const next = () => {
    if (!form[cur.f as keyof typeof form].trim()) return;
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else sendEmail();
  };

  const iStyle = (f: string) => ({
    width: "100%", boxSizing: "border-box" as const,
    background: focused === f ? "rgba(59,130,246,.08)" : "rgba(255,255,255,.04)",
    border: `1.5px solid ${focused === f ? C.blue : C.border}`,
    borderRadius: 12, padding: "13px 17px",
    color: C.textPrim, fontSize: 14, outline: "none",
    fontFamily: "'DM Sans',sans-serif", transition: "all .25s",
  });

  return (
    <section id="contact" style={{ background: C.bg, padding: "clamp(80px,10vw,120px) clamp(16px,4vw,32px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="label-chip" style={{ marginBottom: 20, justifyContent: "center" }}>Démarrer un Projet</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,60px)", fontWeight: 800, color: C.white, letterSpacing: -2, lineHeight: 1.1, marginBottom: 16 }}>
            Construisons quelque chose<br />
            <span className="shim-blue">de remarquable.</span>
          </h2>
          <p style={{ color: C.textSec, fontSize: 15, maxWidth: 400, margin: "0 auto", lineHeight: 1.8 }}>
            Consultation gratuite · Proposition sous 24h · Sans engagement
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          {/* Left info */}
          <div className="contact-left">
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 32, letterSpacing: -0.5 }}>
              Pourquoi les entreprises choisissent RushAI
            </div>
            {[
              { i:"⚡", title:"Réponse sous 24h garantie",   desc:"Consultation et estimation détaillées à chaque demande." },
              { i:"🔐", title:"Sécurité dès l'architecture",  desc:"On-premise, chiffrement AES-256, RGPD dès le premier jour." },
              { i:"📈", title:"ROI mesurable",                desc:"KPIs définis avant la première ligne de code." },
              { i:"🤝", title:"Partenariat bout en bout",     desc:"Stratégie, dev, déploiement et support à chaque étape." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: `1px solid ${C.border}`, transition: "padding .2s", cursor: "default" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.paddingLeft="8px";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.paddingLeft="0";}}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(59,130,246,.1)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{item.i}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 5 }}>{item.title}</div>
                  <div style={{ fontSize: 12.5, color: C.textSec, lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(59,130,246,.07)", border: `1px solid ${C.border}`, borderRadius: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 22 }}>📧</span>
              <div>
                <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3, letterSpacing: 1 }}>EMAIL DIRECT</div>
                <div style={{ fontSize: 14, color: C.blue, fontWeight: 500 }}>contact@rushai.pro</div>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 22, position: "relative", overflow: "hidden", boxShadow: `0 12px 48px rgba(0,0,0,.4)`, minHeight: 460 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.blue},${C.cyan},${C.violet})` }} />

            {sent ? (
              <SuccessScreen name={form.name} email={form.email} onReset={() => { setSent(false); setStep(0); setForm({ name:"",email:"",subject:"",message:"" }); setConsent(false); }} />
            ) : (
              <div style={{ padding: "clamp(22px,5vw,38px) clamp(18px,5vw,32px)" }}>
                {/* Progress bar */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 9 }}>
                    {STEPS.map((_,i) => (
                      <div key={i} style={{ flex: 1, height: 2, borderRadius: 2, background: i < step ? C.blue : i === step ? `linear-gradient(90deg,${C.blue},rgba(59,130,246,.2))` : "rgba(255,255,255,.08)", transition: "background .4s" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>ÉTAPE {step+1} SUR {STEPS.length}</span>
                    <span style={{ fontSize: 10, color: C.blue, fontFamily: "'JetBrains Mono',monospace" }}>{Math.round((step/STEPS.length)*100)}%</span>
                  </div>
                </div>

                <div style={{ fontSize: 26, marginBottom: 10 }}>{cur.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 20 }}>{cur.label}</div>

                {cur.type === "textarea"
                  ? <textarea value={form[cur.f as keyof typeof form]} onChange={e=>setForm(f=>({...f,[cur.f]:e.target.value}))} placeholder={cur.ph} rows={5} style={{...iStyle(cur.f),resize:"none"}} onFocus={()=>setFocused(cur.f)} onBlur={()=>setFocused(null)}/>
                  : <input type={cur.type} value={form[cur.f as keyof typeof form]} onChange={e=>setForm(f=>({...f,[cur.f]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&next()} placeholder={cur.ph} style={iStyle(cur.f)} onFocus={()=>setFocused(cur.f)} onBlur={()=>setFocused(null)}/>
                }

                {/* GDPR consent — shown on last step */}
                {step === STEPS.length - 1 && (
                  <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <input type="checkbox" id="gdpr-ok" checked={consent} onChange={e=>setConsent(e.target.checked)}
                      style={{ width: 15, height: 15, marginTop: 3, accentColor: C.blue, cursor: "pointer", flexShrink: 0 }}
                    />
                    <label htmlFor="gdpr-ok" style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6, cursor: "pointer" }}>
                      J'accepte que mes données soient conservées <strong style={{color:C.textPrim}}>le temps nécessaire</strong> conformément à la{" "}
                      <a href="/confidentialite" target="_blank" style={{ color: C.blue, textDecoration: "underline" }}>Politique de Confidentialité</a>{" "}
                      RGPD. Suppression possible à <a href="mailto:contact@rushai.pro" style={{ color: C.blue }}>contact@rushai.pro</a>.
                    </label>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  {step > 0 && <button onClick={()=>setStep(s=>s-1)} style={{ flex: 1, padding: "13px 16px", borderRadius: "100px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`, color: C.textSec, fontSize: 13, cursor: "pointer" }}>← Retour</button>}
                  <button onClick={next} disabled={sending||(step===STEPS.length-1&&!consent)} style={{
                    flex: 2, padding: "13px 16px", borderRadius: "100px", border: "none", fontSize: 14,
                    fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all .3s", cursor: "pointer",
                    background: (form[cur.f as keyof typeof form].trim() && (step<STEPS.length-1||consent))
                      ? `linear-gradient(135deg,${C.blue},#1D4ED8)` : "rgba(255,255,255,.07)",
                    color: (form[cur.f as keyof typeof form].trim() && (step<STEPS.length-1||consent)) ? "#fff" : C.textMuted,
                    boxShadow: (form[cur.f as keyof typeof form].trim() && (step<STEPS.length-1||consent)) ? `0 6px 24px rgba(59,130,246,.4)` : "none",
                    opacity: sending ? .7 : 1,
                  }}>
                    {sending ? "Envoi en cours..." : step === STEPS.length-1 ? "🚀 Envoyer le message" : "Continuer →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}