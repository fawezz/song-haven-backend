FROM node:10.13-alpine
WORKDIR /usr/app
COPY package*.json /usr/app
RUN npm i
COPY . .
EXPOSE 9090
CMD ["npm", "start"]