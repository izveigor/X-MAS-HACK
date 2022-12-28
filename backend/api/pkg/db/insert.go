package db

import (
	"context"
	"time"
)

func InsertDocument(document Document) error {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	createdDocument := Document{
		Id:         document.Id,
		KeyPhrases: document.KeyPhrases,
		Uuid:       document.Uuid,
		Name:       document.Name,
		Date:       document.Date,
		Status:     document.Status,
		Types:      document.Types,
		Scores:     document.Scores,
	}

	if _, err := DocumentsCollection.InsertOne(ctx, createdDocument); err != nil {
		return err
	}

	return nil
}
