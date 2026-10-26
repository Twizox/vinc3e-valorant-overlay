# Vinc3e Valorant Overlay · Cloudflare Worker

Affiche **seulement l’icône du rang et les RR** de `Vinc3e#uwu` (EU) dans OBS. Aucun fond, aucune bordure, aucun logiciel supplémentaire.

## 1. Créer le Worker (Cloudflare)

1. Connecte-toi à https://dash.cloudflare.com/ → **Workers & Pages** → **Create** → Worker.
2. Nomme-le `vinc3e-valorant-rank` et crée-le.
3. Ouvre **Edit code** et remplace le code par le contenu de `worker.js`, puis **Deploy**.
4. Va dans **Settings → Variables and Secrets → Add** et ajoute **HENRIK_API_KEY** en type **Secret**, avec ta clé HenrikDev (https://dashboard.henrikdev.xyz/). Enregistre/déploie la modification.
5. Ouvre `https://NOM-DU-WORKER.workers.dev/rank` et vérifie qu'un JSON contenant `rank`, `rr` et `icon` apparaît. Une erreur 503 signifie notamment que la clé ou les données du compte sont indisponibles.

## 2. Modifier le site GitHub Pages

1. Dans `index.html`, remplace **uniquement** `https://REPLACE-WITH-YOUR-WORKER.workers.dev/rank` par l'URL `/rank` exacte de ton Worker.
2. Téléverse `index.html` dans ton dépôt GitHub Pages à la racine et active Pages sur la branche `main` si nécessaire.
3. Ouvre l'URL GitHub Pages (sans `?preview=1`) et ajoute-la dans OBS → **Source navigateur**, largeur **220**, hauteur **65**.

## Actualisation et limites

- OBS vérifie les données toutes les **60 secondes**. Le Worker conserve une réponse en cache pendant **60 secondes** par emplacement Cloudflare. Les données HenrikDev peuvent elles-mêmes être mises en cache plusieurs minutes selon l'offre API.
- Une actualisation **instantanée** après la fin d'une partie n'est **pas garantie**. Les limites et quotas HenrikDev restent applicables.
- Si le service API échoue, le widget conserve le dernier rang affiché jusqu'à la prochaine tentative, mais le premier chargement peut être vide.
- Le projet utilise l'API non officielle HenrikDev et n'est pas affilié à Riot Games.
- **Ne place jamais ta clé HenrikDev dans `index.html`, GitHub Pages ou une URL publique.**
- L'ancien workflow GitHub Actions et `stats.json` ne sont plus nécessaires. Ils ont été retirés de cette version.
