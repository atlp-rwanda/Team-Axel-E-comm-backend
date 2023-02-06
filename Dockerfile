FROM node:19.5

WORKDIR /app

COPY ["package.json",  "tsconfig.json", ".env", "./"]

RUN npm install -g pnpm

RUN pnpm install
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait

RUN chmod +x /wait

CMD /wait && pnpm start