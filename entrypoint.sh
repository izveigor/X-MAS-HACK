#!/usr/bin/bash

docker-compose -f docker-compose.rabbitmq.yml up -d
docker-compose -f backend/account/docker-compose.yml up -d
docker-compose -f backend/api/docker-compose.yml up -d
docker-compose -f backend/gateway/docker-compose.yml up -d
docker-compose -f backend/ml/docker-compose.yml up -d
docker-compose -f Frontend/docker-compose.yml up -d

exec "$@"