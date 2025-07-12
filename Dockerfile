# Dockerfile para Frontend React com Node.js 21
FROM node:21-alpine

# Instalar dependências do sistema necessárias
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /home/node/app

# Criar usuário node e dar permissões
RUN chown -R node:node /home/node/app
USER node

# Instalar dependências primeiro (para otimizar cache do Docker)
COPY --chown=node:node package*.json yarn.lock ./

# Instalar dependências usando yarn com otimizações
RUN yarn install --frozen-lockfile --non-interactive \
    && yarn cache clean --force

# Copiar pasta .docker primeiro
COPY --chown=node:node .docker/ ./.docker/

# Dar permissão de execução para o entrypoint
RUN chmod +x ./.docker/entrypoint.sh

# Copiar código fonte
COPY --chown=node:node . .

# Expor as portas 3000 (Vite) e 35729 (Live Reload)
EXPOSE 3000 35729

ENTRYPOINT ["./.docker/entrypoint.sh"]

# Comando padrão (pode ser sobrescrito pelo entrypoint no docker-compose)
CMD ["yarn", "start", "--host", "0.0.0.0"]
