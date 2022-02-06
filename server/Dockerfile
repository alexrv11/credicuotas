# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:1.15.14-buster AS prod-build

COPY . /server-credicuotas
WORKDIR /server-credicuotas

RUN go mod download

RUN go generate ./...
RUN go build -v -o /usr/local/bin/gocredit ./main/main.go

FROM debian:buster AS gocredit
RUN apt-get update && apt-get install -y \
  joe \
  vim \
  ca-certificates

RUN update-ca-certificates

COPY --from=prod-build /usr/local/bin/gocredit /usr/local/bin/gocredit


EXPOSE 8282

# NOTE: to start as bckground worker, use: ENTRYPOINT [ "/usr/local/bin/gocredit", "serve" ]
ENTRYPOINT [ "/usr/local/bin/gocredit", "serve" ]
