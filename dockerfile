# Utilisez une image Node.js en tant qu'image de base
FROM node:17-alpine as build

# Créez le répertoire de travail dans l'image
WORKDIR /app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail de l'image
COPY . .

RUN npx prisma generate

# Exposez le port sur lequel l'application sera en cours d'exécution
EXPOSE 3000

# Commande par défaut pour lancer l'application
CMD ["npm", "run", "dev"]
