FROM --platform=linux/arm64/v8 node:18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]