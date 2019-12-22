FROM ubuntu

RUN apt-get update && apt-get install -y apt-utils cron nodejs npm
RUN npm install -g nodemon

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

RUN mkdir -p /data/btc
RUN mkdir -p /data/fiats

COPY . .

CMD ["nodemon", "./jobs.js"]