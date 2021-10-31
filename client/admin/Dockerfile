FROM node:16

RUN mkdir /admin-frontend

WORKDIR /admin-frontend

COPY ./package.json /admin-frontend

RUN yarn install

COPY . /admin-frontend

RUN yarn build

CMD [ "yarn", "start" ]