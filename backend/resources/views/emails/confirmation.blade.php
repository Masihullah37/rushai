<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f8faff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 32px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0d9488, #2563eb); padding: 40px 32px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 26px; }
    .header p { color: rgba(255,255,255,0.85); margin: 10px 0 0; font-size: 15px; }
    .body { padding: 36px 32px; }
    .body p { color: #334155; font-size: 15px; line-height: 1.8; margin-bottom: 16px; }
    .steps { background: #f0fdfb; border: 1px solid #99f6e8; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
    .steps h3 { color: #0d9488; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 14px; }
    .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; font-size: 13.5px; color: #334155; }
    .footer { background: #f8faff; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Message reçu !</h1>
      <p>Merci, {{ $data['name'] }} — nous reviendrons vers vous rapidement.</p>
    </div>
    <div class="body">
      <p>Bonjour <strong>{{ $data['name'] }}</strong>,</p>
      <p>Nous avons bien reçu votre message concernant <strong>« {{ $data['subject'] }} »</strong>. Notre équipe l'a pris en charge et vous répondra dans les <strong>24 heures</strong>.</p>
      <div class="steps">
        <h3>Prochaines étapes</h3>
        <div class="step">📧 Email de confirmation envoyé à {{ $data['email'] }}</div>
        <div class="step">👀 Notre équipe analyse votre projet</div>
        <div class="step">💡 Élaboration d'une proposition personnalisée</div>
        <div class="step">📞 Appel de découverte planifié sous 24h</div>
      </div>
      <p>En attendant, n'hésitez pas à explorer notre site ou à nous écrire directement à <strong>contact@rushai.pro</strong>.</p>
    </div>
    <div class="footer">© 2026 RushAI — info@rushai.pro · rushai.pro</div>
  </div>
</body>
</html>