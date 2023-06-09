FROM node:20.0.0-bullseye-slim
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]