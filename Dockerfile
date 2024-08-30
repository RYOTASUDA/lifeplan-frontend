FROM node:20.15.1-alpine3.20

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /myapp

RUN apk add --update --no-cache bash curl

COPY package.json yarn.lock /myapp/

RUN yarn install

COPY / /myapp

EXPOSE 3000
