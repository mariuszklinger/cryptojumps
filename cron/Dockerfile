FROM ubuntu

RUN apt-get update && apt-get install -y apt-utils cron nodejs npm

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# copy crontabs for root user
COPY ./cronjob /etc/crontabs/root

# CMD ["crond", "-f", "-d", "8"]
CMD ["node", "./jobs.js"]