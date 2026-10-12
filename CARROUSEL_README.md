# Carrousel d'Événements - Governor's House

## 🎯 Ce qui a été ajouté

### 1. Carrousel d'événements
- Section affichant les événements à venir
- Images verticales (format 3:4) avec texte overlay en bas
- Navigation avec flèches, points indicateurs et swipe mobile
- Autoplay toutes les 5 secondes
- Responsive sur tous les écrans

### 2. Panneau Admin
- Interface simple pour gérer les événements
- Protection par mot de passe
- Ajout, modification et suppression d'événements
- Changement facile des photos, textes et dates

### 3. API Backend
- API Vercel Serverless Functions
- Stockage des données avec Upstash Redis (gratuit via Vercel)
- Mise à jour en temps réel sans redéploiement

## 📦 Structure des fichiers

```
Governor's House/
├── index.html              # Page principale (carrousel ajouté)
├── admin.html              # Panneau d'administration
├── api/
│   ├── events.js           # API GET - Récupérer les événements
│   └── admin/
│       └── update-events.js # API POST - Mettre à jour les événements
├── package.json            # Dépendances (@upstash/redis)
├── vercel.json             # Configuration Vercel
└── .env.example            # Variables d'environnement
```

## 🚀 Déploiement sur Vercel

### Étape 1: Installer Vercel CLI (optionnel)
```bash
npm i -g vercel
```

### Étape 2: Se connecter à Vercel
```bash
vercel login
```

### Étape 3: Déployer le projet
```bash
cd "C:\Users\Kyllian CORVAISIER\Desktop\Governor's House"
vercel
```

Suivez les instructions:
- **Set up and deploy?** → Yes
- **Which scope?** → Votre compte
- **Link to existing project?** → No (ou Yes si vous avez déjà un projet)
- **Project name?** → governors-house (ou autre)
- **Directory?** → ./
- **Override settings?** → No

### Étape 4: Configurer Upstash Redis (via Vercel)

1. Allez sur votre dashboard Vercel: https://vercel.com/dashboard
2. Sélectionnez votre projet "governors-house"
3. Allez dans l'onglet **Storage**
4. Cliquez sur **Create Database**
5. Sélectionnez **Upstash Redis** (ou cherchez "Redis" dans la liste)
6. Donnez un nom: `governors-house-events`
7. Sélectionnez la région: **Europe** (ou proche de vos utilisateurs)
8. Cliquez sur **Create**
9. Vercel va automatiquement ajouter les variables d'environnement Redis

### Étape 5: Configurer le mot de passe admin

1. Dans votre projet Vercel, allez dans **Settings** → **Environment Variables**
2. Ajoutez une nouvelle variable:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `votre_mot_de_passe_securise` (changez-le!)
   - **Environment:** Production, Preview, Development
3. Cliquez sur **Save**

### Étape 6: Redéployer

```bash
vercel --prod
```

Ou depuis le dashboard Vercel: **Deployments** → **Redeploy**

## 🔐 Accès au panneau admin

Une fois déployé, accédez au panneau admin:
```
https://votre-site.vercel.app/admin.html
```

Mot de passe par défaut: `governorshouse2026` (à changer dans les variables d'environnement!)

## 📝 Utilisation du panneau admin

1. **Se connecter**: Entrez le mot de passe
2. **Voir les événements**: Liste de tous les événements actuels
3. **Modifier un événement**: Cliquez sur "Modifier" et changez les informations
4. **Supprimer un événement**: Cliquez sur "Supprimer"
5. **Ajouter un événement**: Remplissez le formulaire en bas de page
   - **URL de l'image**: Chemin de l'image (ex: `/images/event-1.jpg`)
   - **Titre**: Nom de l'événement
   - **Date**: Date au format YYYY-MM-DD
   - **Description**: Description courte

## 🖼️ Ajouter des images

### Option 1: Dossier images/ local
1. Ajoutez vos images dans le dossier `images/`
2. Dans l'admin, utilisez: `/images/mon-event.jpg`
3. Commitez et redéployez

### Option 2: Service d'hébergement d'images (recommandé)
Utilisez un service gratuit comme:
- **Cloudinary** (gratuit jusqu'à 25GB)
- **ImgBB** (gratuit)
- **Imgur** (gratuit)

Uploadez l'image et copiez l'URL complète dans l'admin.

## 💰 Coûts (Plan Gratuit Vercel)

✅ **100% GRATUIT** avec les limites suivantes:
- **Upstash Redis**: 10,000 commandes/jour (largement suffisant)
- **Serverless Functions**: 100GB-heures/mois
- **Bande passante**: 100GB/mois
- **Déploiements**: Illimités

## 🛠️ Développement local

Pour tester en local:

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement Vercel
vercel dev
```

Ouvrez: http://localhost:3000

## 📱 Format des images recommandé

Pour un meilleur rendu:
- **Ratio**: 3:4 (portrait)
- **Dimensions**: 600x800px minimum
- **Poids**: < 500KB (optimisez avec TinyPNG)
- **Format**: JPG ou WebP

## 🔧 Personnalisation

### Changer les couleurs du carrousel
Éditez les variables CSS dans `index.html` (ligne ~119):
```css
:root {
  --ivory:   #FBF8F3;  /* Fond clair */
  --ink:     #0E1B2C;  /* Texte foncé */
  --brass:   #B08D57;  /* Accent doré */
}
```

### Changer la durée de l'autoplay
Dans `index.html`, ligne ~3482:
```javascript
}, 5000); // 5000 = 5 secondes
```

## ❓ Dépannage

### Les événements ne s'affichent pas
1. Vérifiez qu'Upstash Redis est bien configuré
2. Allez dans **Project Settings** → **Environment Variables**
3. Vérifiez que `KV_REST_API_URL` et `KV_REST_API_TOKEN` existent (oui, elles s'appellent toujours KV_*)

### "Mot de passe incorrect" dans l'admin
1. Vérifiez la variable `ADMIN_PASSWORD` dans Vercel
2. Redéployez après modification

### Les images ne s'affichent pas
1. Vérifiez que le chemin de l'image est correct
2. Utilisez des URLs complètes ou des chemins relatifs depuis la racine (`/images/...`)

## 🎨 Aperçu

Le carrousel affiche:
- 3 événements sur desktop
- 2 événements sur tablette
- 1 événement sur mobile

Navigation:
- Flèches gauche/droite
- Points indicateurs en bas
- Swipe sur mobile
- Clavier (← →)
- Autoplay automatique

## 📧 Support

Pour toute question, contactez votre développeur ou consultez:
- Documentation Vercel: https://vercel.com/docs
- Documentation Vercel KV: https://vercel.com/docs/storage/vercel-kv

---

**Prêt à déployer!** 🚀
