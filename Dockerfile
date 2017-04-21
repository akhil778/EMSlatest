FROM node:latest

RUN mkdir -p "/code"




ADD . /code
WORKDIR /code

RUN npm install
EXPOSE 8080

CMD ["node", "server.js"]
