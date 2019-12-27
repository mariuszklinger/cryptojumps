# CryptoJumps
Simple dashboard to present where in the world Bitcoin price will be soon nice round number (in local currency).

Live preview: http://crypto.mariuszklinger.pl/

## Stack:
Main focus in the project was to use `docker-compose` combining: Nginx, cron and React (react-create-script).

## API:
- openexchangerates.org - to get fiat currency rates
- coindesk.com - to get Bitcoin (USDBTC)

## Run:
Development:
``` bash
$ cp .env.example .env
$ vim .env # edit it here!
$ docker-compose -f docker-compose.dev.yml up
```

Open http://localhost or http://localhost:<WEB_SERVER_PORT> where `WEB_SERVER_PORT` is set in `.env`.

## TODO:
- visualize using D3 world map
