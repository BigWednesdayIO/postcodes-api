FROM node:5.1.0

EXPOSE 8080

COPY . /usr/postcodes-api

WORKDIR /usr/postcodes-api

RUN npm install

CMD ["npm", "start"]
