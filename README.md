# sports-club-front

sports-club est une plateforme moderne de gestion de clubs sportifs. Cette interface (Frontend) permet aux utilisateurs de créer, rejoindre et gérer des communautés sportives avec une expérience fluide et élégante.

## Fonctionnalités

- Authentification complète : Système de login/JWT avec gestion d'état global.

- Accès Sécurisé : Protection des routes sensibles et gestion des rôles (Owner/Member).

- Gestion de Clubs : Création de clubs et visualisation des adhésions.

- Profil Utilisateur : Espace personnel avec récupération dynamique des données.

- Design Premium : Interface responsive bâtie avec Tailwind CSS v4.

## Stack Technique
- Framework : React (Vite.js)

- Langage : TypeScript

- Style : Tailwind CSS v4

- Navigation : React Router 7

- Client API : Axios

- Gestion d'état : Context API

## Installation

1. **Créer** un dossier
```bash
mkdir sports-club
cd sports-club
```
2. **Cloner** les dépôts
```bash
git clone https://github.com/Enzob4/sports-club-frontend.git
git clone https://github.com/Enzob4/sports-club-api.git
```
3. **Démarrer** docker
```bash
cd sports-club-api
docker compose up -d
```
4. **Génerer** les clés de sécurité
```bash
docker compose exec backend php bin/console lexik:jwt:generate-keypair
```
5. **Créer et charger** la base de données et les fixtures
```bash
docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
docker compose exec backend php bin/console doctrine:fixtures:load --no-interaction
```
6. **Se connecter** à http://localhost:3000/
```bash
admin@example.com
password
```

## Structure du projet
```bash
src/
├── api/            # Configuration Axios
├── components/     # Composants réutilisables (Navbar, Layout, ProtectedRoute)
├── context/        # AuthContext (Gestion du token et de l'utilisateur)
├── pages/          # Pages principales (Auth, Clubs, MyClubs, Profile)
└── App.tsx         # Configuration des routes
```
## Backend 
Ce projet nécessite l'API sports-club-api Backend (Symfony / API Platform) pour fonctionner correctement.

