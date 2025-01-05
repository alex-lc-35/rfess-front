# Étape 1 : Utiliser l'image Node.js officielle
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires pour les dépendances
COPY package*.json yarn.lock ./

# Étape 4 : Installer les dépendances
RUN yarn install --frozen-lockfile

# Étape 5 : Copier tout le projet
COPY . .

# Étape 6 : Exposer le port 8201
EXPOSE 8201

# Étape 7 : Lancer l'application Vue CLI
CMD ["yarn", "serve", "--host", "0.0.0.0", "--port", "8201"]
