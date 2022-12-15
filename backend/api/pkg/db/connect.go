package db

import (
	"context"
	"log"
	"time"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Document struct {
	// ID     primitive.ObjectID `bson:"_id"`
	Name   string    `bson:"text"`
	Date   time.Time `bson:"time"`
	Status string    `bson:"status"`
	Types  []string  `bson:"types"`
	Scores []float32 `bson:"scores"`
}

var documentsCollection *mongo.Collection

func ConnectToMongo() {
	client, err := mongo.NewClient(options.Client().ApplyURI(config.Config.MongoUrl))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	documentsCollection = client.Database("documents").Collection("documents")
}
