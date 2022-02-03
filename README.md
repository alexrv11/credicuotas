# credicuotas

## Get started on Golang server

### Install Environment

- Golang
- Postgres
- Goland or VSCode with golang extends
- Graphql client https://github.com/graphql/graphql-playground


``cd server/``
``go get ./...``
``go build ./...``
``go generate ./...``

### Config your dev.env


``cd server/config``
``cp sample.env dev.env``

- Configure a env variable

``ENV=development``

### config database

- Create a postgres database
- update the connection database on dev.env


## Docker compose

### Run all services

``docker-compose up``

### Remove all volumes

``docker-compose down --volumes``

## migrate schema db

``npx prisma db push``

## mobile app

``cd  client/app``
``yarn install``

### react native run ios device

``cd ios && pod install``
``yarn android``

### react native run android device

``yarn android``

