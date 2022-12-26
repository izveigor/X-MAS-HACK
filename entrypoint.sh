#!bin/sh

docker-compose -f backend/account/docker-compose.yml up --build
docker-compose -f backend/api/docker-compose.yml up --build
docker-compose -f backend/gateway/docker-compose.yml up --build
docker-compose -f backend/ml/docker-compose.yml up --build
docker-compose -f Frontend/docker-compose.yml up --build

exec "$@"