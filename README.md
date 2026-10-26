# Vinc3e Valorant Rank Overlay

Overlay sans fond, sans cadre : icône du rang + RR.

## Installation

1. Vérifie que `https://vinc3e-valorant-overlay.guigui97457.workers.dev/rank` renvoie tes statistiques.
2. Sur GitHub, crée un dépôt public `vinc3e-valorant-overlay`.
3. Importe **index.html** à la racine du dépôt. Ne publie jamais ta clé HenrikDev.
4. Dans Settings > Pages, choisis Deploy from a branch > main > /(root) > Save.
5. Attends la publication, puis ouvre `https://TON-UTILISATEUR.github.io/vinc3e-valorant-overlay/`.
6. Dans OBS, ajoute une source Navigateur avec cette URL, largeur 230, hauteur 60, placée au-dessus de la capture du jeu.

Ajoute `?preview` à l'URL pour voir les éventuelles erreurs sur un fond de diagnostic (ne pas utiliser en stream).

Le widget vérifie le Worker toutes les 60 secondes. Le Worker et HenrikDev peuvent mettre les données en cache, donc les RR ne sont pas garantis instantanés.

L'icône est recherchée dans les collections de rangs publiques de valorant-api.com. Si cette API ne répond pas, le texte RR reste affiché, mais l'icône peut manquer.
