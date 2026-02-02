# sports-club-front

sports-club est une plateforme moderne de gestion de clubs sportifs. Cette interface (Frontend) permet aux utilisateurs de créer, rejoindre et gérer des communautés sportives avec une expérience fluide et élégante.

## Fonctionnalités

- Authentification complète : Système de login/JWT avec gestion d'état global.

- Accès Sécurisé : Protection des routes sensibles et gestion des rôles (Owner/Member).

- Gestion de Clubs : Création de clubs et visualisation des adhésions.

- Profil Utilisateur : Espace personnel avec récupération dynamique des données.

- Design Premium : Interface responsive bâtie avec Tailwind CSS v4 et effets de glassmorphism.

## Stack Technique
- Framework : React (Vite.js)

- Langage : TypeScript

- Style : Tailwind CSS v4

- Navigation : React Router 7

- Client API : Axios

- Gestion d'état : Context API

## Installation

1. **Cloner** le dépôt
```bash
git clone https://github.com/Enzob4/sports-club-frontend.git
cd sports-club-front
```
2. **Installer** les dépendances
```bash
npm install
```
3. **Configuration** Créez un fichier .env à la racine et configurez l'URL de votre API Symfony
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```
4. **Lancer** le projet
```bash
npm run dev
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
Ce projet nécessite l'API sports-club-api Backend (Symfony / API Platform) pour fonctionner correctement. Assurez-vous que le serveur backend est lancé.

