// src/components/Contact.tsx
import { useState } from "react";
import { C } from "../constants/colors";
import SuccessScreen from "./SuccessScreen";

const STEPS = [
  { f: "name", label: "Votre nom complet", ph: "Marie Dupont", type: "text", icon: "👤" },
  { f: "email", label: "Email professionnel", ph: "marie@entreprise.fr", type: "email", icon: "📧" },
  { f: "subject", label: "Type de projet", ph: "Chatbot IA / Plateforme RAG / Tableau de bord...", type: "text", icon: "🎯" },
  { f: "message", label: "Décrivez votre projet et vos objectifs", ph: "Parlez-nous de votre défi métier, stack actuel, délais souhaités et résultats attendus...", type: "textarea", icon: "✍️" },
];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const cur = STEPS[step];

  const sendEmail = async () => {
    setSending(true);
    try {
      // Appel API vers votre backend Laravel
      const response = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) throw new Error("Erreur d'envoi");
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
    setSent(true);
    setSending(false);
  };

  const next = () => {
    if (!form[cur.f as keyof typeof form].trim()) return;
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else sendEmail();
  };

  const iStyle = (f: string) => ({
    width: "100%",
    boxSizing: "border-box" as const,
    background: focused === f ? C.tealBg : "#f8faff",
    border: `1.5px solid ${focused === f ? C.tealLt : C.border}`,
    borderRadius: 13,
    padding: "13px 17px",
    color: C.text,
    fontSize: 14,
    outline: "none",
    fontFamily: "'DM Sans',sans-serif",
    transition: "all .25s",
  });

  return (
    <section id="contact" style={{ padding: "clamp(60px,10vw,120px) clamp(16px,4vw,28px)", background: "white" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.gold, letterSpacing: 3, marginBottom: 14 }}>// DÉMARRER UN PROJET</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: C.text, letterSpacing: -1.2, marginBottom: 16 }}>
            Construisons quelque chose <span className="shim">de remarquable</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 15, maxWidth: 420, margin: "0 auto", lineHeight: 1.8 }}>
            Consultation gratuite · Proposition sous 24h · Sans engagement
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }}>
          <div className="contact-left">
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 28 }}>Pourquoi les entreprises choisissent RushAI</div>
            {[
              { i: "⚡", c: C.teal, t: "Réponse sous 24h garantie", d: "Nous répondons à chaque demande sous 24h avec une consultation et une estimation détaillées." },
              { i: "🔐", c: C.violet, t: "Sécurité dès l'architecture", d: "Chaque solution est conçue avec options on-premise, chiffrement et conformité RGPD dès le premier jour." },
              { i: "📈", c: C.gold, t: "Axé sur le ROI mesurable", d: "Nous définissons les KPIs avant d'écrire la moindre ligne de code. Vos métriques sont notre boussole." },
              { i: "🤝", c: C.green, t: "Partenariat de bout en bout", d: "Stratégie, conception, développement, déploiement et support — nous vous accompagnons à chaque étape." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, padding: "16px 18px", background: "#f8faff", borderRadius: 16, border: `1.5px solid ${C.border}`, transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.c + "55"; e.currentTarget.style.background = item.c === C.teal ? C.tealBg : item.c === C.violet ? C.violetBg : item.c === C.gold ? C.goldBg : C.greenBg; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "#f8faff"; }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: item.c === C.teal ? C.tealBg : item.c === C.violet ? C.violetBg : item.c === C.gold ? C.goldBg : C.greenBg, border: `1px solid ${item.c}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.i}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 5 }}>{item.t}</div>
                  <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{item.d}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18, padding: "16px 20px", background: C.tealBg, border: `1.5px solid ${C.tealLt}33`, borderRadius: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 24 }}>📧</div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>EMAIL DIRECT</div>
                <div style={{ fontSize: 14, color: C.teal, fontWeight: 600 }}>contact@rushai.pro</div>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div style={{ background: "white", border: `1.5px solid ${C.border}`, borderRadius: 26, position: "relative", overflow: "hidden", boxShadow: `0 20px 60px rgba(0,0,0,.07)`, minHeight: 460 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.teal},${C.blue},${C.gold})` }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${C.tealLt}08,transparent 70%)`, pointerEvents: "none" }} />

            {sent ? <SuccessScreen name={form.name} email={form.email} onReset={() => { setSent(false); setStep(0); setForm({ name: "", email: "", subject: "", message: "" }); }} /> : (
              <div style={{ padding: "clamp(22px,5vw,38px) clamp(18px,5vw,34px)" }}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 9 }}>
                    {STEPS.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? `linear-gradient(90deg,${C.teal},${C.blue})` : i === step ? `linear-gradient(90deg,${C.tealLt}bb,${C.tealLt}22)` : "#e2e8f0", transition: "background .4s" }} />)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: C.muted, fontFamily: "'JetBrains Mono',monospace" }}>ÉTAPE {step + 1} SUR {STEPS.length}</span>
                    <span style={{ fontSize: 10, color: C.teal, fontFamily: "'JetBrains Mono',monospace" }}>{Math.round((step / STEPS.length) * 100)}%</span>
                  </div>
                </div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{cur.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 20 }}>{cur.label}</div>
                {cur.type === "textarea"
                  ? <textarea value={form[cur.f as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [cur.f]: e.target.value }))} placeholder={cur.ph} rows={5} style={{ ...iStyle(cur.f), resize: "none" }} onFocus={() => setFocused(cur.f)} onBlur={() => setFocused(null)} />
                  : <input type={cur.type} value={form[cur.f as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [cur.f]: e.target.value }))} onKeyDown={e => e.key === "Enter" && next()} placeholder={cur.ph} style={iStyle(cur.f)} onFocus={() => setFocused(cur.f)} onBlur={() => setFocused(null)} />}
                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "13px 16px", borderRadius: 12, background: "#f8faff", border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 13, cursor: "pointer" }}>← Retour</button>}
                  <button onClick={next} disabled={sending} style={{ flex: 2, padding: "13px 16px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, fontFamily: "'Syne',sans-serif", transition: "all .3s", background: form[cur.f as keyof typeof form].trim() ? `linear-gradient(135deg,${C.teal},${C.blue})` : "#f1f5f9", color: form[cur.f as keyof typeof form].trim() ? "white" : C.muted, boxShadow: form[cur.f as keyof typeof form].trim() ? `0 6px 24px ${C.shadow}` : "none", opacity: sending ? .7 : 1, cursor: "pointer" }}>
                    {sending ? "Envoi en cours..." : step === STEPS.length - 1 ? "🚀 Envoyer le message" : "Continuer →"}
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