# syntax=docker/dockerfile:1

FROM node:16.13.2
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*","server.js", "./"]

RUN npm install --production

COPY ./src/index.template.html ./src/
COPY dist ./dist

CMD [ "node", "server.js" ]