



// ════════════════════════════════════════════════════════════════
// FILE: src/pages/Privacy.tsx — UPDATED
// RGPD compliant, no personal name, SIRET included, dark theme
// ════════════════════════════════════════════════════════════════
import { C, CSS } from "../constants/colors";

export default function Privacy() {
  const sections = [
    {
      title: "1. Responsable du Traitement",
      body: `L'entité responsable du traitement de vos données personnelles est RushAI (SIRET : 95257716100021), accessible via le site rushai.pro.

Contact pour toute question relative aux données personnelles : contact@rushai.pro`
    },
    {
      title: "2. Données Collectées",
      body: `Lors de l'utilisation du formulaire de contact, les données suivantes sont collectées :
• Nom et prénom
• Adresse email professionnelle
• Sujet et contenu du message
• Date et heure de soumission
• Enregistrement du consentement RGPD

Aucune autre donnée (adresse IP, cookies analytiques, données bancaires) n'est collectée via ce formulaire.`
    },
    {
      title: "3. Finalité et Base Légale du Traitement",
      body: `Vos données sont traitées dans les buts suivants :
• Répondre à votre demande de contact ou de devis
• Vous envoyer une proposition commerciale personnalisée

Base légale : votre consentement explicite (Art. 6(1)(a) RGPD), matérialisé par la case à cocher présente dans le formulaire de contact.`
    },
    {
      title: "4. Durée de Conservation",
      body: `Vos données sont conservées uniquement pendant la durée nécessaire au traitement de votre demande. Cette durée est généralement de 3 mois, mais peut varier selon les nécessités de l'échange commercial.

RushAI se réserve le droit de supprimer ces données à tout moment dès que leur conservation n'est plus justifiée, et en tout état de cause dans un délai maximum de 12 mois.`
    },
    {
      title: "5. Destinataires des Données",
      body: `Vos données sont traitées exclusivement par l'équipe RushAI (SIRET : 95257716100021) et ne sont ni transmises à des tiers, ni revendues.

Services techniques utilisés pour le traitement :
• Resend (envoi d'emails transactionnels) — conforme RGPD
• Hostinger (hébergement serveur) — serveurs localisés en Union Européenne`
    },
    {
      title: "6. Vos Droits (RGPD)",
      body: `Conformément au Règlement Général sur la Protection des Données (UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :

• Droit d'accès à vos données
• Droit de rectification des données inexactes
• Droit à l'effacement (« droit à l'oubli »)
• Droit à la limitation du traitement
• Droit d'opposition au traitement
• Droit à la portabilité des données

Pour exercer ces droits, contactez-nous à : contact@rushai.pro
Objet : « Demande RGPD »
Nous répondrons dans un délai de 30 jours maximum.

Vous pouvez également introduire une réclamation auprès de la CNIL : cnil.fr`
    },
    {
      title: "7. Sécurité des Données",
      body: `RushAI met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données :
• Chiffrement en transit via HTTPS/TLS
• Accès restreint selon le principe du moindre privilège
• Base de données sécurisée sur serveur dédié localisé en Europe
• Aucune donnée stockée hors de l'Union Européenne`
    },
    {
      title: "8. Cookies",
      body: `Le site rushai.pro n'utilise pas de cookies de tracking, de profilage ou de ciblage publicitaire. Seuls des cookies techniques strictement nécessaires au bon fonctionnement du site peuvent être déposés. Aucun cookie analytique ou publicitaire tiers n'est installé.`
    },
    {
      title: "9. Modifications de la Politique",
      body: `RushAI se réserve le droit de modifier cette politique de confidentialité à tout moment afin de rester conforme aux évolutions législatives et réglementaires. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous encourageons à la consulter régulièrement.`
    },
    {
      title: "10. Contact",
      body: `Pour toute question relative à la protection de vos données personnelles :

Site : rushai.pro
Email : contact@rushai.pro
Objet : « Demande RGPD »
SIRET : 95257716100021

Nous nous engageons à répondre dans un délai de 30 jours ouvrés.`
    },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.textPrim, fontFamily: "'DM Sans',sans-serif" }}>
      <style>{CSS}</style>

      {/* Simple nav bar */}
      <div style={{ background: "rgba(6,10,20,.95)", borderBottom: `1px solid ${C.border}`, padding: "14px clamp(16px,4vw,32px)" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textSec, fontSize: 13, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "color .2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.blue}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.textSec}>
          ← Retour au site
        </a>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px clamp(16px,4vw,32px) 80px" }}>

        {/* Header */}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.blue, letterSpacing: 2.5, marginBottom: 14, textTransform: "uppercase" as const }}>
          Politique de Confidentialité
        </div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: C.white, letterSpacing: -2, marginBottom: 10, lineHeight: 1.1 }}>
          Confidentialité &amp; Protection<br />des Données
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>Dernière mise à jour : 1er janvier 2025</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.textMuted, display: "inline-block" }} />
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>SIRET : 95257716100021</span>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < sections.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(16px,2.5vw,21px)", fontWeight: 700, color: C.white, marginBottom: 14, letterSpacing: -0.5 }}>{s.title}</h2>
            <div style={{ whiteSpace: "pre-line" as const, color: C.textSec, lineHeight: 1.88, fontSize: 14 }}>{s.body}</div>
          </div>
        ))}

        {/* Footer note */}
        <div style={{ padding: "20px 24px", background: "rgba(59,130,246,.07)", border: `1px solid ${C.border}`, borderRadius: 14, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.7 }}>
            <strong style={{ color: C.white }}>RushAI</strong> — SIRET : 95257716100021<br />
            Site : <a href="https://rushai.pro" style={{ color: C.blue }}>rushai.pro</a> · Email : <a href="mailto:contact@rushai.pro" style={{ color: C.blue }}>contact@rushai.pro</a>
          </p>
        </div>
      </div>
    </div>
  );
}