#!/bin/sh

# https://docs.mongodb.com/getting-started/shell/import-data/


# En dos comandos...
#curl -O https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
#mongoimport --db test --collection restaurants --drop --file primer-dataset.json


# Por defecto curl imprime el documento en sdout y por defecto mongoimport lee desde stdin
curl https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json | mongoimport --host mongodb --db test --collection restaurants --drop