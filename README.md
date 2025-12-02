# MedNéon

Application de gestion de cabinet médical futuriste (SPA).

## Déploiement sur Coolify

Ce projet est prêt à être déployé comme une **Static Site** sur Coolify.

1. **Source** : Connectez votre dépôt GitHub.
2. **Build Command** : `npm install && npm run build`
3. **Publish Directory** : `dist`
4. **Configuration** : Aucune variable d'environnement complexe n'est requise.

L'application utilise `vite` avec `base: './'` pour assurer que les assets (JS/CSS) sont chargés correctement via des chemins relatifs. Le fichier `public/_redirects` gère le routing côté client.
