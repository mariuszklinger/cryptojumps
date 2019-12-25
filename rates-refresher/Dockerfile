FROM node

# RUN apt-get update && apt-get install -y apt-utils nodejs npm
RUN npm install -g nodemon

WORKDIR /usr/src/app
COPY package*.json ./
COPY jobs.js ./

RUN mkdir -p /data/btc
RUN mkdir -p /data/fiats

RUN npm install