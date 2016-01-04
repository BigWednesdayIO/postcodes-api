FROM node:5.3.0

EXPOSE 8080

COPY . /usr/local/postcodes-api

WORKDIR /usr/local/postcodes-api

RUN npm install

CMD ["npm", "start"]
