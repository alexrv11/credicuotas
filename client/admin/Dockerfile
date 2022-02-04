# build environment
FROM node:14.19-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn global add react-scripts@4.0.3

COPY . ./

RUN yarn run build

# production environment
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
