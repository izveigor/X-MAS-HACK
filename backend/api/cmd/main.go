package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/hashicorp/go-hclog"
	"github.com/izveigor/X-MAS-HACK/pkg/broker"
	"github.com/izveigor/X-MAS-HACK/pkg/config"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"github.com/izveigor/X-MAS-HACK/pkg/handlers/documents"
)

var (
	bindAddress string = config.Config.Host + ":" + config.Config.Port
)

func main() {
	db.ConnectToMongo()
	broker.ConnectToBroker()
	broker.StartPublisher()
	go broker.StartConsumer()

	l := hclog.Default()

	router := mux.NewRouter()

	documentsHandler := documents.NewDocuments(l)

	getDocuments := router.Methods(http.MethodGet).Subrouter()
	getDocuments.HandleFunc(config.Config.PrefixUrl+"/documents", documentsHandler.GetDocuments)
	getDocuments.Use(documentsHandler.MiddlewareAuthorization)

	postDocuments := router.Methods(http.MethodPost).Subrouter()
	postDocuments.HandleFunc(config.Config.PrefixUrl+"/documents", documentsHandler.CreateDocument)
	postDocuments.Use(documentsHandler.MiddlewareAuthorization)

	cors := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"http://localhost:5173"}),
		gohandlers.AllowedHeaders([]string{"Accept", "Accept-Language", "Content-Type", "Content-Language", "Origin", "Authorization"}),
	)

	server := http.Server{
		Addr:         bindAddress,
		Handler:      cors(router),
		ErrorLog:     l.StandardLogger(&hclog.StandardLoggerOptions{}),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	go func() {
		l.Info("Starting server on port ", config.Config.Port)

		if err := server.ListenAndServe(); err != nil {
			l.Error("Server has stopped", "error", err)
			os.Exit(1)
		}
	}()

	channel := make(chan os.Signal, 1)
	signal.Notify(channel, os.Interrupt)
	signal.Notify(channel, os.Kill)

	sig := <-channel
	log.Println("Got signal:", sig)

	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	server.Shutdown(ctx)
}
