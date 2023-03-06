FROM node:19.5.0-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock",  "tsconfig.json", ".env", "./"]

RUN yarn

COPY . .

EXPOSE 8080

CMD yarn migrate:dev && yarn dev