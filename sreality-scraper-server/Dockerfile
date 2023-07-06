FROM --platform=linux/arm64/v8 node:18

WORKDIR /app

COPY package.json ./

RUN npm install

# This is workaround for the issue when running app using puppeteer in Docker on Mac mashine with M2 Pro chip
RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

COPY . .

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PORT=3000
ENV DB_NAME="sreality_scraper_db"
ENV DB_USER="postgres"
ENV DB_HOST="postgresql"

CMD ["npm", "start"]