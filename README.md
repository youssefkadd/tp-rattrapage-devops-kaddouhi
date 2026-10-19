# TP de rattrapage DevOps

API Node.js Express, tests automatisés, Docker, GitHub Actions et publication GHCR.

## Installation et tests

```bash
npm install
npm test
npm start
curl http://localhost:3000/health
```

## Conteneurisation

```bash
docker build -t tp-devops-api:1.0.0 .
docker run --rm -p 3000:3000 tp-devops-api:1.0.0
curl http://localhost:3000/health
```

**Pourquoi copier package.json avant le code ?** Docker met en cache la couche d'installation des dépendances. Tant que package.json ne change pas, une modification du code source ne force pas la réinstallation des dépendances, ce qui accélère les constructions.

## Pipeline CI/CD

Le workflow s'exécute sur les pushes vers main, les pull requests vers main et les tags v*. Le job `test` installe Node.js 20, génère le verrou npm s'il manque, puis lance `npm ci` et `npm test`. Le job `build` dépend de `test`, construit l'image Docker et exécute le smoke test. Le job `publish` s'exécute seulement sur les tags v* et publie sur GHCR avec GITHUB_TOKEN.

## Preuve du blocage du build

Créer la branche `fix/bug`, remplacer temporairement l'addition par une soustraction dans `src/app.js`, puis ouvrir une pull request vers main. Vérifier que `test` échoue et que `build` est ignoré, capturer l'écran et fermer la PR sans la fusionner.

## Publication GHCR

Pousser le tag `v1.0.0`, puis vérifier la publication de `ghcr.io/youssefkadd/tp-devops-api:v1.0.0` dans Packages.

Aucun secret n'est stocké en clair dans le dépôt.
