``` bash
$ cp .env.example .env
$ docker-compose -f docker-compose.dev.yml up -d
```

Open http://localhost or http://localhost:<WEB_SERVER_PORT> where `WEB_SERVER_PORT` is set in `.env`.