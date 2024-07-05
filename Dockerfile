# frontend/Dockerfile
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application
COPY . /app

# Installer les dépendances
RUN npm install

# Exposer le port utilisé par Nuxt.js
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
