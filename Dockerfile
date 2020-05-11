FROM node:13 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/.bin/webpack

FROM nginx:stable
COPY --from=build /app/html/ /usr/share/nginx/html
EXPOSE 80
