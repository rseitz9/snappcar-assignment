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
ENV PORT=7000

COPY package*.json ./

RUN npm ci --quiet

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 7000

CMD ["npm","run","start-docker-dev"]
