package documents

import (
	"context"
	"net/http"
	"strings"
)

func (d *Documents) MiddlewareAuthorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		var token string = ""
		var authorization string = r.Header.Get("Authorization")
		var args []string = strings.Split(authorization, " ")
		if args[0] == "Token" {
			token = args[1]
		}

		if token == "" {
			d.l.Error("Failed authentication", "error", nil)
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}

		/*response, err := grpc.AuthenticationServiceClient.Service.Authenticate(context.Background(), &pb.AuthenticationRequest{
			Token: token,
		})

		if err != nil {
			d.l.Error("Failed authentication", "error", err)
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}*/

		var uuid = "123" // response.GetUuid()

		ctx := context.WithValue(r.Context(), KeyUUID{}, UUID{Value: uuid})
		r = r.WithContext(ctx)

		next.ServeHTTP(rw, r)
	})
}
