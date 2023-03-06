FROM node:14

WORKDIR /app

COPY ["package.json", "yarn.lock",  "tsconfig.json", ".env", "./"]

RUN yarn

COPY . .

EXPOSE 8080

CMD yarn migrate:dev && yarn seed:dev && yarn dev
