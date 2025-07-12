#!/bin/sh
set -e

# Adiciona os binários do node_modules ao PATH
export PATH=/home/node/app/node_modules/.bin:$PATH

# Instala as dependências se a pasta node_modules não existir
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências..."
  yarn install --frozen-lockfile --non-interactive
fi

# Executa o comando passado para o entrypoint (o CMD do Dockerfile)
exec "$@"