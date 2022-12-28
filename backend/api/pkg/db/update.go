package db

import (
	"context"
	"log"
	"sort"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type TypesScores struct {
	Type  string
	Score float32
}

func sortTypes(types []string, scores []float32) ([]string, []float32) {
	typesScoresArray := []TypesScores{}
	for i := 0; i < len(types); i++ {
		typesScoresArray = append(typesScoresArray, TypesScores{
			Type:  types[i],
			Score: scores[i],
		})
	}
	sort.Slice(typesScoresArray, func(i, j int) bool {
		return typesScoresArray[i].Score > typesScoresArray[j].Score
	})

	typesArray := []string{}
	scoresArray := []float32{}

	for i := 0; i < len(typesScoresArray); i++ {
		typesArray = append(typesArray, typesScoresArray[i].Type)
	}

	for i := 0; i < len(typesScoresArray); i++ {
		scoresArray = append(scoresArray, typesScoresArray[i].Score)
	}

	return typesArray, scoresArray
}

func UpdateDocument(id string, types []string, scores []float32, keyPhrases []string) (*Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		log.Fatal(err)
	}

	sortedTypes, sortedScores := sortTypes(types, scores)
	filter := bson.M{"_id": bson.M{"$eq": objID}}
	updateDocument := bson.M{"$set": bson.M{
		"status":      "Готово",
		"types":       sortedTypes,
		"scores":      sortedScores,
		"key_phrases": keyPhrases,
	}}

	results := DocumentsCollection.FindOneAndUpdate(ctx, filter, updateDocument, options.FindOneAndUpdate().SetReturnDocument(1))

	var document Document

	if err := results.Decode(&document); err != nil {
		return nil, err
	}
	return &document, nil
}
