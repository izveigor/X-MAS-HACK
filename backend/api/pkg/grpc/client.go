package grpc

import (
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	"github.com/izveigor/X-MAS-HACK/pkg/grpc/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Client struct {
	Service pb.AuthenticationClient
}

func InitAuthenticationClient() pb.AuthenticationClient {
	conn, err := grpc.Dial(config.Config.AuthenticationServiceUrl, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal(err)
	}

	return pb.NewAuthenticationClient(conn)
}

var AuthenticationServiceClient Client = Client{
	Service: InitAuthenticationClient(),
}
