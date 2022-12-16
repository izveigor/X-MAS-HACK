package db

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestFindDocument(t *testing.T) {
	ConnectToMongo()
	defer func() {
		documentsCollection.Drop(context.TODO())
	}()

	firstDocument := Document{
		Name:   "name",
		Date:   time.Date(2009, time.November, 10, 23, 0, 30, 0, time.UTC),
		Status: "Готово",
		Types:  []string{"Аренда", "Продажа"},
		Scores: []float32{0.69, 0.79},
	}
	secondDocument := Document{
		Name:   "name",
		Date:   time.Date(2009, time.November, 10, 23, 0, 30, 1, time.UTC),
		Status: "Готово",
		Types:  []string{"Продажа", "Аренда"},
		Scores: []float32{0.61, 0.71},
	}

	documents := []interface{}{
		firstDocument,
		secondDocument,
	}

	if _, err := documentsCollection.InsertMany(context.TODO(), documents); err != nil {
		t.Fatal(err)
	}

	checkedDocuments := []Document{
		firstDocument,
		secondDocument,
	}

	foundDocuments, _ := FindDocuments(1)

	for i := 0; i < len(foundDocuments); i++ {
		assert.Equal(t, foundDocuments[i].Name, checkedDocuments[i].Name)
		assert.Equal(t, foundDocuments[i].Status, checkedDocuments[i].Status)
		assert.Equal(t, foundDocuments[i].Types, checkedDocuments[i].Types)
		assert.Equal(t, foundDocuments[i].Scores, checkedDocuments[i].Scores)
	}
}
