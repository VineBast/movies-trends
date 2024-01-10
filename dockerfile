# Utilisez une image Node.js en tant qu'image de base
FROM node:19-alpine as build

# Créez le répertoire de travail dans l'image
WORKDIR /app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Copiez le reste des fichiers dans le répertoire de travail de l'image
COPY . .

RUN npx prisma generate

# Exposez le port sur lequel l'application sera en cours d'exécution
EXPOSE 3000

# Configurez Puppeteer pour utiliser le Chromium installé
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Ajoutez un utilisateur non-root
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Définissez l'utilisateur non-root pour l'exécution
USER pptruser

# Commande par défaut pour lancer l'application
CMD ["npm", "run", "dev"]
