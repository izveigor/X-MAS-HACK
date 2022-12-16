package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

var (
	paginationSize = 10
)

func FindDocuments(page int, uuid string) ([]*Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	var documents []*Document

	cursor, err := documentsCollection.Find(ctx, bson.D{{"uuid", uuid}})
	if err != nil {
		return nil, err
	}

	var (
		index int = 0
		start int = paginationSize * (page - 1)
		end   int = paginationSize*page - 1
	)

	for cursor.Next(context.TODO()) {
		if index == end {
			break
		} else if start <= index {
			var document Document
			err := cursor.Decode(&document)
			if err != nil {
				return nil, err
			}

			documents = append(documents, &document)
		}
		index++
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	return documents, nil
}
