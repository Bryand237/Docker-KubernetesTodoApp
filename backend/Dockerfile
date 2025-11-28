# On part d;une base officielle
FROM python:3.9-slim

#On definit le dossier de travail dans le conteneur
WORKDIR /app

# On copie les fichiers de dependances et on installe
COPY requirements.txt .
RUN pip install -r requirements.txt

# On copie le code source
COPY . .

# On expose le port du serveur Flask
EXPOSE 5500

# La commande de demarage
CMD [ "python", "main.py" ]