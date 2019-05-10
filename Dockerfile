FROM node:12.2.0-alpine AS build

COPY . /app

WORKDIR /app

RUN npm i && npm run build

FROM nginx:1.15-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/config.nginx /etc/nginx/conf.d/default.conf

EXPOSE 80 443
