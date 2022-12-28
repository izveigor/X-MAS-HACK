package db

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestInsertDocuments(t *testing.T) {
	defer func() {
		DocumentsCollection.Drop(context.TODO())
	}()
	ConnectToMongo()

	document := Document{
		Id:         primitive.NewObjectID(),
		KeyPhrases: []string{"образовательной", "договора", "исполнителя", "российской", "федерации"},
		Uuid:       "123",
		Name:       "0b4be82b86eff410d69d1d6b5553.docx",
		Date:       time.Now(),
		Status:     "Готово",
		Types:      []string{"Договор поставки", "Договор оказания услуг", "Договор подряда", "Договор аренды", "Договор купли-продажи"},
		Scores:     []float32{0.02, 0.83, 0.08, 0.01, 0.06},
	}

	err := InsertDocument(document)
	if err != nil {
		t.Fatal(err)
	}

	filter := bson.D{{"_uuid", document.Uuid}}

	var result Document

	if err := DocumentsCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, document.Id, result.Id)
	assert.Equal(t, document.KeyPhrases, result.KeyPhrases)
	assert.Equal(t, document.Uuid, result.Uuid)
	assert.Equal(t, document.Name, result.Name)
	assert.Equal(t, document.Status, result.Status)
	assert.Equal(t, document.Types, result.Types)
	assert.Equal(t, document.Scores, result.Scores)
}
