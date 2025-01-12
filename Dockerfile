# Étape 1 : Build Vue.js avec Node.js
FROM node:18-alpine AS builder
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache  # Installation sans cache

# Copier le reste du projet après installation des dépendances pour maximiser le cache Docker
COPY . ./
RUN yarn build  # Build en mode production

# Étape 2 : Servir les fichiers compilés avec Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
