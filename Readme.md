# MovieWatch 🎬

Une application web permettant aux utilisateurs de **créer un compte**, **gérer leurs films et séries préférés**, et **découvrir des recommandations personnalisées** grâce à l'[API TMDB](https://www.themoviedb.org/) et à l'API Mistral AI.

---

## Fonctionnalités

- **Authentification** : Inscription et connexion sécurisées avec gestion de session (JWT).
- **Gestion des favoris** : Ajoute des films et séries à ta liste de favoris personnelle.
- **Exploration** : Parcours les films et séries populaires avec leurs détails (genres, notes, synopsis, affiches).
- **Recommandations IA** : Obtient des suggestions personnalisées via l'API Mistral.
- **Scraping de données** : Scripts Python/Selenium pour des tests.

---

## Technologies utilisées
 
 - **Frontend** | Next.js + TypeScript | Interface réactive (App Router) pour parcourir les films et gérer les favoris.
 - **Backend** | Node.js + Express | API REST pour l'authentification et la gestion des favoris.
 - **Base de données** | MongoDB (Mongoose) | Stockage des données.
 - **Tests** | Python + Selenium | Scripts de tests.
 - **IA** | API Mistral | Génération de recommandations personnalisées.
 - **Conteneurisation** | Docker | Déploiement simplifié de l'ensemble des services.
