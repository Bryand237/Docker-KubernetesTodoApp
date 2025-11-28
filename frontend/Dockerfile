# --- Etape 1: Le Builder (on construit le site) ---
FROM node:18-alpine as builder

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie et installation des dependances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Commande de creation du build
RUN npm run build

# --- Etape 2: Le serveur (Nginx) ---
# On part d'une image vierge Nginx
FROM nginx:alpine

# On copie les fichiers construits a l'etape 1 (builder) vers le dossier par defaut de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx ecoude par defaut sur le port 80
EXPOSE 80

# On lance Nginx au premier plan pour que le conteneur ne s'arrete pas
CMD [ "nginx", "-g", "daemon off;" ]
