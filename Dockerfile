FROM node:26-alpine

LABEL org.opencontainers.image.source="https://github.com/chaeyeong3199/AIOSS"
LABEL org.opencontainers.image.description="AIOSS Week 9 Docker image"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY bin ./bin

EXPOSE 3000

CMD ["npm", "start"]