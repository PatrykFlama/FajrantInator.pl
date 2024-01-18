FROM node:21-alpine

RUN mkdir -p ./app
WORKDIR ./app
COPY package*.json .
RUN npm install
COPY . .
RUN echo DB_URI=finator-db > ./src/.env
EXPOSE 3000
CMD [ "npm", "start" ]