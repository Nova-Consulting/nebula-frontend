# Usar a imagem oficial do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de dependências para dentro do container
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos para o container
COPY . .

RUN npm install --global @ui5/cli

# Expor a porta 80
EXPOSE 8080

# Iniciar a aplicação com Node.js
CMD ["node", "server.js"]