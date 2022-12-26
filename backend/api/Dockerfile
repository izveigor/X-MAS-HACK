FROM golang:1.19
WORKDIR /home/app/api

ENV r = 1
ENV GO111MODULE=on

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -o api cmd/main.go