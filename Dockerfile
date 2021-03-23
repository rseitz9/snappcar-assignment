#build
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm ci --quiet && npm run build


#production
FROM node:14

WORKDIR /app
#env vars
ENV NODE_ENV=production
ENV PORT=7001
ENV MONGO_CONNECTION_STRING=mongodb://db:27017/car-pricing-service

COPY package*.json ./

RUN npm ci --quiet

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 7001

CMD ["npm","run","start-docker-dev"]
