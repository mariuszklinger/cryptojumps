``` bash
$ cp .env.example .env
$ docker-compose -f docker-compose.dev.yml up -d
```

Open http://localhost:<WEB_SERVER_PORT> where `WEB_SERVER_PORT` is set in `.env`.

## Links

- https://stackoverflow.com/questions/21866477/nginx-use-environment-variables/57891894#57891894
  - https://hub.docker.com/_/nginx