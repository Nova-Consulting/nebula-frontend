# Etapa 1: Construção da aplicação Fiori
FROM node:18-alpine AS builder

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/fiori

# Copiar os arquivos de dependências para o container
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho no container
COPY . .

# Etapa 2: Configuração da imagem final
FROM node:18-alpine

# Definir o diretório de trabalho na imagem final
WORKDIR /usr/src/fiori

# Copiar os arquivos gerados na etapa de construção
COPY --from=builder /usr/src/fiori .

# Copiar o arquivo de configuração do Nginx para dentro do container
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 8080
EXPOSE 8080

# Comando para iniciar a aplicação Fiori
RUN npm run build

CMD ["npm", "run", "start"]