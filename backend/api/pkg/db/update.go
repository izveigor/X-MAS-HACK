package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpdateDocument(id string, types []string, scores []float32, keyPhrases []string) (*Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	filter := bson.D{{"id", id}}
	updateDocument := bson.M{"$set": bson.M{
		"status":      "Анализ",
		"types":       types,
		"scores":      scores,
		"key_phrases": keyPhrases,
	}}

	results := documentsCollection.FindOneAndUpdate(ctx, filter, updateDocument, options.FindOneAndUpdate().SetReturnDocument(1))

	var document Document

	if err := results.Decode(&document); err != nil {
		return nil, err
	}
	return &document, nil
}
