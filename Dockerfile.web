FROM node:10.16.1-alpine AS build

LABEL maintainer="nick.zhigalin@gmail.com"

EXPOSE 80 443

WORKDIR /app

COPY package.json /app/

RUN npm i

COPY . /app

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/config.nginx /etc/nginx/conf.d/default.conf
