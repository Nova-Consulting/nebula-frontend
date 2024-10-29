# Usar a imagem do NGINX
FROM nginx:alpine

# Definir o diretório de trabalho
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do NGINX
RUN rm -rf ./*

# Copiar os arquivos da aplicação Fiori (pasta dist) para o container
COPY . .

# Expor a porta 80
EXPOSE 80

# Iniciar o servidor NGINX automaticamente
CMD ["nginx", "-g", "daemon off;"]