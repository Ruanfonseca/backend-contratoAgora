# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se houver)
COPY package*.json ./

# Instale as dependências do projeto, incluindo as dependências de desenvolvimento
RUN npm install

# Instale o nodemon globalmente
RUN npm install -g nodemon

# Copie o restante do código para o diretório de trabalho
COPY . .

# Copie o arquivo .env para o container
COPY .env .env

# Exponha a porta que o serviço está escutando
EXPOSE 8000

# Comando para iniciar o nodemon no modo de desenvolvimento
CMD ["nodemon", "index.js"] 
