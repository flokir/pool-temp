FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

ARG NODE_ENV=production

RUN yarn install --immutable --immutable-cache --check-cache

RUN yarn run build

USER node

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]