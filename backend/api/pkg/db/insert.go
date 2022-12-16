package db

import (
	"context"
	"sort"
	"time"
)

type TypesScores struct {
	Type  string
	Score float32
}

func sortTypes(document Document) ([]string, []float32) {
	typesScoresArray := []TypesScores{}
	for i := 0; i < len(document.Types); i++ {
		typesScoresArray = append(typesScoresArray, TypesScores{
			Type:  document.Types[i],
			Score: document.Scores[i],
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

func InsertDocument(document Document) error {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	types, scores := sortTypes(document)
	createdDocument := Document{
		Name:   document.Name,
		Date:   document.Date,
		Status: document.Status,
		Types:  types,
		Scores: scores,
	}

	if _, err := documentsCollection.InsertOne(ctx, createdDocument); err != nil {
		return err
	}

	return nil
}
