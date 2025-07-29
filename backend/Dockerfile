FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npx tsc
EXPOSE 5001
CMD ["node", "dist/server.js"]
