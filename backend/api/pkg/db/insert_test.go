package db

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
)

func TestSortTypes(t *testing.T) {
	document := Document{
		Name:   "name",
		Date:   time.Date(2009, time.November, 10, 23, 0, 30, 0, time.UTC),
		Status: "Готово",
		Types:  []string{"Аренда", "Продажа", "A", "B"},
		Scores: []float32{0.69, 0.79, 0.59, 0.75},
	}

	types, scores := sortTypes(document)

	assert.Equal(t, types, []string{"Продажа", "B", "Аренда", "A"})
	assert.Equal(t, scores, []float32{0.79, 0.75, 0.69, 0.59})
}

func TestInsert(t *testing.T) {
	ConnectToMongo()
	defer func() {
		documentsCollection.Drop(context.TODO())
	}()

	document := Document{
		Name:   "name",
		Date:   time.Date(2009, time.November, 10, 23, 0, 30, 0, time.UTC),
		Status: "Готово",
		Types:  []string{"Аренда", "Продажа", "A", "B"},
		Scores: []float32{0.69, 0.79, 0.59, 0.75},
	}

	err := InsertDocument(document)
	if err != nil {
		t.Fatal(err)
	}

	documentFilter := bson.D{{"name", "name"}}
	var documentResult Document
	documentsErr := documentsCollection.FindOne(context.TODO(), documentFilter).Decode(&documentResult)
	if documentsErr != nil {
		t.Fatal(documentsErr)
	}

	assert.Equal(t, document.Name, documentResult.Name)
	assert.Equal(t, document.Status, documentResult.Status)
}
