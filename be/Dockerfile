FROM node:11

RUN npm install -g nodemon

RUN mkdir -p /app
WORKDIR /usr

COPY package*.json ./
COPY index.js ./

RUN npm install

EXPOSE 8080
CMD [ "nodemon", "index.js" ]