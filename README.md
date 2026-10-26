# Vinc3e Valorant Rank Overlay

Mini-overlay OBS : **icône de rang + RR uniquement**, sans fond, cadre ni bordure.

## Mise en ligne sur GitHub Pages

1. Créer un dépôt GitHub public, par exemple `vinc3e-valorant-overlay`.
2. Importer **tous les fichiers et dossiers** de ce projet, y compris `.github/workflows/update.yml`.
3. Obtenir une clé API HenrikDev via https://docs.henrikdev.xyz/ .
4. GitHub → dépôt → **Settings → Secrets and variables → Actions → New repository secret** : nom `HENRIK_API_KEY`, valeur = clé. Ne jamais la placer dans un fichier du dépôt.
5. Onglet **Actions → Actualiser les RR Valorant → Run workflow** pour lancer la première mise à jour.
6. **Settings → Pages → Build and deployment → Deploy from a branch** : branche `main`, dossier `/ (root)` → Save.
7. Attendre la publication puis ouvrir `https://VOTRE-PSEUDO.github.io/vinc3e-valorant-overlay/`.
8. Dans OBS → Sources → Navigateur : coller cette URL. Dimensions conseillées : **220 × 65**. La source doit être placée au-dessus de la capture du jeu.

Pour prévisualiser l'overlay sur un fond sombre, ajouter `?preview=1` à l'URL dans un navigateur (ne pas utiliser ce paramètre dans OBS).

## Actualisation

GitHub Actions est programmé toutes les 10 minutes, mais les tâches planifiées peuvent être retardées. L'API HenrikDev peut aussi mettre ses données en cache. OBS relit `stats.json` toutes les minutes. Ce n'est pas du temps réel.

## Important

GitHub Pages est public : le rang, les RR et le Riot ID sont visibles dans les fichiers publics. **La clé API, elle, reste privée** dans GitHub Secrets. Si le dépôt interdit l'écriture par GitHub Actions, aller dans **Settings → Actions → General → Workflow permissions → Read and write permissions**. L'API HenrikDev est non officielle. Si l'API modifie son format, il faudra adapter `update_stats.py`.
