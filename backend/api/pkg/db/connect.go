package db

import (
	"context"
	"log"
	"time"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Document struct {
	Id         primitive.ObjectID `bson:"_id", json:"_id, omitempty"`
	KeyPhrases []string           `bson:"key_phrases", json:"key_phrases"`
	Uuid       string             `bson:"_uuid", json:"_uuid, omitempty"`
	Name       string             `bson:"name", json:"name"`
	Date       time.Time          `bson:"time", json:"time"`
	Status     string             `bson:"status", json:"status"`
	Types      []string           `bson:"types", json:"types"`
	Scores     []float32          `bson:"scores", json:"scores"`
}

var DocumentsCollection *mongo.Collection

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

	DocumentsCollection = client.Database("documents").Collection("documents")
}
