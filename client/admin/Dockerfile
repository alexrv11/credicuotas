# build environment
FROM node:14.19-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

RUN yarn build

# production environment
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
