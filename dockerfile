FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install && npm cache clean --force

EXPOSE 3000

CMD ["node", "index"]

# the static pages should be place in /pages