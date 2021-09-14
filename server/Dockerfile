FROM node:14-alpine
RUN adduser -S josh -u 1001

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY . .

USER josh
CMD ["yarn", "start"]
