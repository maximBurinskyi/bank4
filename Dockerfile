FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm i --production


