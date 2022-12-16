package grpc

import (
	"github.com/izveigor/X-MAS-HACK/pkg/config"
	"github.com/izveigor/X-MAS-HACK/pkg/grpc/pb"
	"google.golang.org/grpc"
)

type Client struct {
	Service pb.AuthenticationClient
}

func InitAuthenticationClient() pb.AuthenticationClient {
	conn, err := grpc.Dial(config.Config.AuthenticationServiceUrl)
	if err != nil {
		// log.Fatal(err)
	}

	return pb.NewAuthenticationClient(conn)
}

var AuthenticationServiceClient Client = Client{
	Service: InitAuthenticationClient(),
}
