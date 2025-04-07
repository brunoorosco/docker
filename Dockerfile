# Use a imagem oficial do Node.js como base
FROM node:20-alpine as builder
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm i --omit=dev

# Copia o resto dos arquivos do projeto
COPY . .

# Build da aplicação
RUN npm run build

# Imagem final otimizada
FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta que a aplicação utiliza
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
