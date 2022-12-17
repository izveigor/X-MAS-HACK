FROM node:alpine
WORKDIR /home/app/Frontend
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
RUN npm install -g serve