FROM node:15.13-alpine

WORKDIR /usr/src/react-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]