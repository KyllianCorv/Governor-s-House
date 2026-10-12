# 🚀 Déploiement Rapide - Carrousel Governor's House

## ✅ Ce qui a été fait

1. ✅ **Carrousel d'événements** ajouté dans `index.html`
   - Images verticales avec texte en overlay
   - Navigation flèches + points
   - Swipe mobile + autoplay

2. ✅ **Panneau admin** créé (`admin.html`)
   - Modification facile des photos, textes et dates
   - Protection par mot de passe
   - Interface simple et intuitive

3. ✅ **API Backend** avec Vercel Serverless Functions
   - `/api/events` - Récupérer les événements
   - `/api/admin/update-events` - Mettre à jour (protégé)

4. ✅ **Stockage Upstash Redis** (gratuit via Vercel)
   - Pas besoin de redéployer pour modifier
   - 10,000 requêtes/jour gratuites

## 🎯 Déploiement en 5 minutes

### 1. Installer les dépendances
```bash
cd "C:\Users\Kyllian CORVAISIER\Desktop\Governor's House"
npm install
```

### 2. Déployer sur Vercel
Si vous avez déjà un compte Vercel connecté:
```bash
vercel --prod
```

Sinon, installez Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Configurer Upstash Redis (1 minute)

**Sur le dashboard Vercel** (https://vercel.com/dashboard):

1. Ouvrez votre projet
2. **Storage** → **Create Database** → **Upstash Redis**
3. Nom: `governors-house-events`
4. Région: **Europe**
5. **Create** ✅

Les variables Redis sont ajoutées automatiquement!

### 4. Changer le mot de passe admin

**Settings** → **Environment Variables** → **Add New**

- Name: `ADMIN_PASSWORD`
- Value: `VotreMotDePasseSecurise2026`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- **Save**

### 5. Redéployer
```bash
vercel --prod
```

## 🎉 C'est fait!

Votre site est maintenant en ligne avec le carrousel!

### Accès:
- **Site public**: `https://votre-site.vercel.app`
- **Admin**: `https://votre-site.vercel.app/admin.html`

### Premier accès admin:
1. Allez sur `/admin.html`
2. Entrez votre mot de passe
3. Modifiez les événements par défaut
4. Ajoutez vos propres événements

## 📸 Ajouter des images

### Option facile (utiliser vos images existantes):
```
/images/IMG_4988.jpeg
/images/IMG_5032.jpeg
/images/IMG_5075.jpeg
```

### Option recommandée (hébergement externe):
1. Uploadez sur **Cloudinary** (gratuit)
2. Copiez l'URL
3. Collez dans l'admin

## 🆘 Problème?

### "Erreur lors du chargement"
→ Vérifiez qu'Upstash Redis est bien créé dans **Storage**

### "Mot de passe incorrect"
→ Vérifiez `ADMIN_PASSWORD` dans **Environment Variables**

### Les images ne s'affichent pas
→ Utilisez des chemins complets ou relatifs: `/images/mon-image.jpg`

## 📱 Test rapide

1. **Site public** → Section "Événements" apparaît
2. **Admin** → Connexion avec mot de passe
3. **Modifier** un événement → Vérifier sur le site public
4. **Ajouter** un événement → Il apparaît immédiatement

## 💡 Astuce

Les modifications dans l'admin sont **instantanées** - pas besoin de redéployer!

---

**Besoin d'aide?** Consultez `CARROUSEL_README.md` pour plus de détails.

**Tout est 100% GRATUIT** avec le plan gratuit Vercel! 🎉
