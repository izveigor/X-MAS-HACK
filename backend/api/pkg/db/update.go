package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpdateDocument(id string, types []string, scores []float32, keyPhrases []string) (*Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		log.Fatal(err)
	}

	filter := bson.M{"_id": bson.M{"$eq": objID}}
	updateDocument := bson.M{"$set": bson.M{
		"status":      "Готово",
		"types":       types,
		"scores":      scores,
		"key_phrases": keyPhrases,
	}}

	results := DocumentsCollection.FindOneAndUpdate(ctx, filter, updateDocument, options.FindOneAndUpdate().SetReturnDocument(1))

	var document Document

	if err := results.Decode(&document); err != nil {
		return nil, err
	}
	return &document, nil
}
