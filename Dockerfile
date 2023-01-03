FROM node:alpine
WORKDIR /usr/app
COPY package*.json /usr/app
RUN npm ci
COPY . .
EXPOSE 9090
CMD ["npm", "start"]