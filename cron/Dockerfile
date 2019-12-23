FROM ubuntu

RUN apt-get update && apt-get install -y apt-utils cron nodejs npm
RUN npm install -g nodemon

# COPY /data/btc/latest.example.json /data/btc/latest.json

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

RUN mkdir -p /data/btc
RUN mkdir -p /data/fiats
# RUN ["echo", "'/data/btc'"]
# RUN ls /data/btc
# RUN ["cp", "-f", "/data/btc/latest.example.json", "/data/btc/latest.json"]
# RUN ["cp", "-f", "/data/fiats/latest.example.json", "/data/fiats/latest.json"]

COPY . .

CMD ["nodemon", "./jobs.js"]