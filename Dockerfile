FROM node:13-alpine AS build

LABEL maintainer="nick.zhigalin@gmail.com"

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

RUN yarn build

FROM nginx:1.17-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
