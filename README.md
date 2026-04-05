# RushAI — Systèmes IA & Automatisation Enterprise


## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Stack technique](#-stack-technique)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation locale](#-installation-locale)
- [Configuration](#-configuration)
- [Lancer le projet](#-lancer-le-projet)
- [Build et déploiement](#-build-et-déploiement)
- [Variables d'environnement](#-variables-denvironnement)
- [Structure des dossiers](#-structure-des-dossiers)
- [Fonctionnalités](#-fonctionnalités)
- [API Backend](#-api-backend)
- [Voir en ligne](#-voir-en-ligne)

---

## 🚀 Aperçu

| Section | Description |
|---|---|
| **Hero** | Animation 3D Jelly Sphere (Three.js), typewriter, badges flottants |
| **Services** | 10 services IA avec cartes animées au scroll |
| **Dashboard BI** | Tableau de bord live avec KPIs, graphiques, sparklines |
| **Moteur RAG** | Démo interactive d'un moteur de recherche documentaire IA |
| **Contact** | Formulaire multi-étapes avec consentement RGPD |
| **Confidentialité** | Page politique RGPD complète |

---

## 🛠 Stack technique

### Frontend
| Technologie | Version | Usage |
|---|---|---|
| React | 18 | Framework UI |
| TypeScript | 5 | Typage statique |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3.4 | Styles utilitaires |
| Three.js | latest | Animation 3D (JellySphere) |
| @react-three/fiber | latest | React binding Three.js |
| @react-three/drei | latest | Helpers Three.js (MeshTransmission) |

### Backend
| Technologie | Version | Usage |
|---|---|---|
| PHP | 8.3 | Runtime |
| Laravel | 11 | Framework API |
| MySQL | 8 | Base de données |
| Resend | SDK | Envoi d'emails transactionnels |

### Infrastructure
| Service | Usage |
|---|---|
| Hostinger | Hébergement (serveurs EU) |
| Let's Encrypt | Certificats SSL gratuits |
| Resend | Livraison email RGPD-conforme |

---

## 🏗 Architecture du projet

```
rushai/
├── frontend/                 # Application React (SPA)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── og-image.jpg      # Image Open Graph (1200×630px)
│   ├── src/
│   │   ├── components/       # Composants React
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── JellySphere.tsx   # 3D Three.js
│   │   │   ├── Services.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RAGDemo.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── SuccessScreen.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   └── Privacy.tsx   # Page RGPD /confidentialite
│   │   ├── constants/
│   │   │   └── colors.ts     # Palette + CSS global
│   │   ├── utils/
│   │   │   └── chatKnowledge.ts
│   │   ├── App.tsx           # Routing + SEO meta
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html            # SEO + Open Graph meta tags
│   ├── .env                  # Dev (gitignored)
│   ├── .env.production       # Prod (gitignored)
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── backend/                  # API Laravel 11
    ├── app/
    │   ├── Http/
    │   │   └── Controllers/
    │   │       └── ContactController.php
    │   └── Models/
    │       └── Contact.php
    ├── database/
    │   └── migrations/
    │       └── xxxx_create_contacts_table.php
    ├── routes/
    │   └── api.php
    ├── config/
    │   └── cors.php
    ├── bootstrap/
    │   └── app.php
    ├── .env                  # Local (gitignored)
    └── .env.example
```

---

## 📦 Prérequis

Assurez-vous d'avoir installé les outils suivants :

```bash
# Vérifier les versions
node --version      # >= 18.0.0
npm --version       # >= 9.0.0
php --version       # >= 8.2
composer --version  # >= 2.6
mysql --version     # >= 8.0
```

**Outils recommandés :**
- [Laragon](https://laragon.org/) (Windows — inclut PHP, MySQL, Apache)
- [Node.js LTS](https://nodejs.org/)
- [VS Code](https://code.visualstudio.com/)

---

## ⚙️ Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE_USERNAME/rushai.git
cd rushai
```

### 2. Installer les dépendances Frontend

```bash
cd frontend

# Installer toutes les dépendances npm
npm install

# Installer les dépendances 3D (Three.js)
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### 3. Installer les dépendances Backend

```bash
cd ../backend

# Installer les packages PHP via Composer
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application Laravel
php artisan key:generate
```

### 4. Configurer la base de données

Créez une base de données MySQL locale :

```sql
-- Connectez-vous à MySQL
mysql -u root -p

-- Créer la base
CREATE DATABASE rushai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 5. Configurer les variables d'environnement

Éditez `backend/.env` :

```env
APP_NAME=RushAI
APP_ENV=local
APP_KEY=base64:VOTRE_CLE_GENEREE
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rushai_db
DB_USERNAME=root
DB_PASSWORD=VOTRE_MOT_DE_PASSE

RESEND_API_KEY=re_VOTRE_CLE_RESEND
CONTACT_EMAIL=votre@email.com

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

Créez `frontend/.env` :

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=RushAI
```

### 6. Lancer les migrations

```bash
cd backend
php artisan migrate
```

---

## 🚀 Lancer le projet

Ouvrez **deux terminaux** :

**Terminal 1 — Backend Laravel :**
```bash
cd backend
php artisan serve
# → API disponible sur http://localhost:8000
# → Test: http://localhost:8000/api/health
```

**Terminal 2 — Frontend React :**
```bash
cd frontend
npm run dev
# → Site disponible sur http://localhost:5173
```

Ouvrez votre navigateur à l'adresse : **http://localhost:5173**

---

## 🏗 Build et déploiement

### Build production Frontend

```bash
cd frontend

# Build optimisé pour la production
npm run build

# Les fichiers générés sont dans frontend/dist/
# → Copier le contenu de dist/ vers public_html/ sur Hostinger
```

### Déploiement Backend sur Hostinger

```bash
cd backend

# Installer sans les dépendances de développement
composer install --no-dev --optimize-autoloader

# Sur le serveur (via SSH)
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

## 🔑 Variables d'environnement

### Frontend

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | URL de l'API backend | `https://api.rushai.pro/api` |
| `VITE_APP_NAME` | Nom de l'application | `RushAI` |

### Backend

| Variable | Description | Exemple |
|---|---|---|
| `APP_KEY` | Clé de chiffrement Laravel | `base64:...` |
| `APP_ENV` | Environnement | `production` |
| `APP_DEBUG` | Mode debug | `false` |
| `DB_DATABASE` | Nom de la BDD | `u123456_rushai_db` |
| `DB_USERNAME` | Utilisateur MySQL | `u123456_rushai_user` |
| `DB_PASSWORD` | Mot de passe MySQL | `...` |
| `RESEND_API_KEY` | Clé API Resend | `re_...` |
| `CONTACT_EMAIL` | Email destinataire | `contact@rushai.pro` |

> ⚠️ **Sécurité** : Ne commitez jamais les fichiers `.env` dans Git. Ils sont listés dans `.gitignore`.

---

## 📁 Structure des dossiers

```
src/components/
├── Navbar.tsx          # Navigation responsive (MENU + hamburger)
├── Hero.tsx            # Section hero avec JellySphere 3D
├── JellySphere.tsx     # Sphère Three.js avec anneau chrome
├── Services.tsx        # 10 services avec animation scroll
├── Dashboard.tsx       # Dashboard BI live (KPIs, graphiques)
├── RAGDemo.tsx         # Démo moteur RAG interactif
├── About.tsx           # Section à propos avec word reveal
├── Contact.tsx         # Formulaire multi-étapes + RGPD
├── SuccessScreen.tsx   # Écran de confirmation envoi
├── Chatbot.tsx         # Widget chatbot flottant
└── Footer.tsx          # Pied de page avec liens fonctionnels

src/pages/
└── Privacy.tsx         # Politique de confidentialité RGPD

src/constants/
└── colors.ts           # Palette de couleurs + CSS global

src/utils/
└── chatKnowledge.ts    # Base de connaissances chatbot
```

---


## 🌐 Voir en ligne

Le site est déployé et accessible à l'adresse :

**🔗 [https://rushai.pro](https://rushai.pro)**

| URL | Description |
|---|---|
| `https://rushai.pro` | Site principal |
| `https://rushai.pro/confidentialite` | Politique de confidentialité |
| `https://api.rushai.pro/api/health` | Santé de l'API backend |

---

## 🤝 Contribuer

Ce dépôt est privé et propriétaire. Toute utilisation, reproduction ou distribution du code sans autorisation explicite est interdite.

Pour toute question professionnelle : **contact@rushai.pro**

---

## 📜 Licence

© 2026 RushAI  — Tous droits réservés.

Ce projet est propriétaire et confidentiel. Il ne peut pas être réutilisé, copié ou distribué sans autorisation écrite préalable.

---


**Fait par Masihullah Rushan zamir**

[rushai.pro](https://rushai.pro) · [contact@rushai.pro](mailto:contact@rushai.pro)
