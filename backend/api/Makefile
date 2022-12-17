start:
	go run cmd/main.go

test:
	go test -v -cover github.com/izveigor/X-MAS-HACK/pkg/handlers/documents

proto:
	protoc -I ./pkg/grpc/pb/ --go_out=. --go-grpc_out=. ./pkg/grpc/pb/*.proto