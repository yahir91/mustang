FROM node:16.13.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .  .

ENV PORT=3002

EXPOSE 3002

CMD [ "node" , "test.js" ]

