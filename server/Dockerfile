# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:1.15.14-buster AS prod-build

COPY . /code
WORKDIR /code
ENV GO111MODULE=on
RUN go get -d -v ./...
RUN go generate ./...
RUN go build -v -o /usr/local/bin/gocredit ./main/main.go


# perhaps use alpine here, for runtime image?
FROM debian:buster
RUN apt-get update && apt-get install -y \
  joe \
  vim \
  ca-certificates

RUN update-ca-certificates

COPY --from=prod-build /usr/local/bin/gocredit /usr/local/bin/gocredit

# copy the default config from the codebase so checked-in changes to this file make it to production
COPY --from=prod-build /code/config/default.json /config/default.json

# port exposed for when it runs as server. When started as a worker, it is ignored.
EXPOSE 8081
EXPOSE 9000

# todo: run as non-root user?


# NOTE: to start as bckground worker, use: ENTRYPOINT [ "/usr/local/bin/gocredit", "work" ]
ENTRYPOINT [ "/usr/local/bin/gocredit", "serve" ]
