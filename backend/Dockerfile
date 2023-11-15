FROM node:16 AS build-stage

RUN mkdir -p /app

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

EXPOSE 5000

CMD ["npm", "start"]

