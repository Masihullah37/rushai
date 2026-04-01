// src/utils/chatKnowledge.ts
export const CHAT_KB = [
  { 
  "k": ["prix", "tarif", "coût", "budget", "combien", "invest"], 
  "r": "Nos solutions sont conçues sur mesure pour répondre aux besoins          spécifiques de chaque entreprise. Pour obtenir une analyse détaillée de votre projet et une proposition adaptée à vos objectifs, nous vous invitons à réserver un appel de découverte gratuit. 💼" 
},
  { k: ["rag", "récupér", "document", "connaissance", "données privées"], r: "Nos systèmes RAG permettent à votre équipe d'interroger vos documents internes en langage naturel — 100% privé, zéro partage externe. Construit avec LangChain, bases vectorielles et contrôle d'accès enterprise. 🔐" },
  { k: ["chatbot", "whatsapp", "support", "client", "assist"], r: "Nous construisons des chatbots IA pour le web, WhatsApp et les CRM. Ils traitent 70%+ des requêtes automatiquement — qualification de leads, prise de RDV, 24h/24, en toute langue. 🤖" },
  { k: ["sécur", "privé", "rgpd", "conformité", "chiffr"], r: "La sécurité est notre fondement architectural : options on-premise, chiffrement AES-256, contrôle d'accès par rôles, pistes d'audit, RGPD/SOC2-conforme par défaut. 🔒" },
  { k: ["api", "intégr", "connect", "crm", "erp"], r: "Nous développons des APIs REST & GraphQL sur mesure et intégrons tout votre stack — CRM, ERP, SaaS, bases de données. Architecture microservices pour la scalabilité. 🔗" },
  { k: ["tableau", "analytique", "kpi", "rapport"], r: "Tableaux de bord temps réel avec suivi KPI — Streamlit, Django ou React. Visibilité instantanée sur les métriques métier et les performances des modèles. 📊" },
  { k: ["devops", "déployer", "docker", "cicd", "cloud"], r: "DevOps complet : Docker, CI/CD GitHub Actions, cloud sur AWS/GCP/Hostinger. Déploiements sans interruption avec rollback automatique et monitoring. 🐳" },
  { k: ["délai", "temps", "durée", "combien de temps", "semaine"], r: "Chatbots : 1–2 semaines. Systèmes RAG : 3–5 semaines. Plateformes enterprise : 2–3 mois. Plan de jalons détaillé fourni en amont. ⏱️" },
  { k: ["bonjour", "salut", "hello", "bonsoir", "coucou"], r: "Bonjour ! 👋 Bienvenue chez RushAI. Posez-moi toutes vos questions sur nos services IA, automatisation, sécurité ou tarifs." },
  { k: ["qui", "à propos", "rushai", "entreprise", "équipe"], r: "RushAI est un cabinet spécialisé en Systèmes IA & Automatisation. Nous concevons et déployons des solutions IA sécurisées — des plateformes RAG aux infrastructures DevOps — pour les entreprises à travers le monde. 🚀" },
  { k: ["contact", "email", "joindre", "embaucher", "commencer"], r: "Prêt à démarrer ? Descendez vers la section Contact ou écrivez-nous directement à info@rushai.pro 📧" },
];

export function getChatResponse(input: string): string {
  const l = input.toLowerCase();
  for (const kb of CHAT_KB) if (kb.k.some(k => l.includes(k))) return kb.r;
  return "Excellente question ! Pour une réponse précise, décrivez votre projet dans le formulaire Contact — nous répondons sous 24h. 🚀";
}