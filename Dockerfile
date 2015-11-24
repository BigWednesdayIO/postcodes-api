FROM node:5.1.0

COPY . /usr/postcodes-api

WORKDIR /usr/postcodes-api

RUN npm install

CMD ["npm", "start"]
