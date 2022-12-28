package db

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestFindDocuments(t *testing.T) {
	defer func() {
		DocumentsCollection.Drop(context.TODO())
	}()
	ConnectToMongo()

	first_document := Document{
		Id:         primitive.NewObjectID(),
		KeyPhrases: []string{"образовательной", "договора", "исполнителя", "российской", "федерации"},
		Uuid:       "123",
		Name:       "0b4be82b86eff410d69d1d6b5553.docx",
		Date:       time.Now(),
		Status:     "Готово",
		Types:      []string{"Договор поставки", "Договор оказания услуг", "Договор подряда", "Договор аренды", "Договор купли-продажи"},
		Scores:     []float32{0.02, 0.83, 0.08, 0.01, 0.06},
	}

	second_document := Document{
		Id:         primitive.NewObjectID(),
		KeyPhrases: []string{"договора", "объект", "настоящего", "имущества", "покупатель"},
		Uuid:       "234",
		Name:       "0ca2f9faecdbc67d6686a9f5b663.doc",
		Date:       time.Now(),
		Status:     "Готово",
		Types:      []string{"Договор поставки", "Договор оказания услуг", "Договор подряда", "Договор аренды", "Договор купли-продажи"},
		Scores:     []float32{0.1, 0.03, 0.02, 0.05, 0.8},
	}

	documents := []interface{}{
		first_document,
		second_document,
	}

	if _, err := DocumentsCollection.InsertMany(context.TODO(), documents); err != nil {
		t.Fatal(err)
	}

	right_documents := []Document{
		first_document,
	}

	foundDocuments, err := FindDocuments(1, "123")
	if err != nil {
		t.Fatal(err)
	}

	for i := 0; i < len(foundDocuments); i++ {
		assert.Equal(t, right_documents[i].Id, foundDocuments[i].Id)
		assert.Equal(t, right_documents[i].KeyPhrases, foundDocuments[i].KeyPhrases)
		assert.Equal(t, right_documents[i].Uuid, foundDocuments[i].Uuid)
		assert.Equal(t, right_documents[i].Name, foundDocuments[i].Name)
		assert.Equal(t, right_documents[i].Status, foundDocuments[i].Status)
		assert.Equal(t, right_documents[i].Types, foundDocuments[i].Types)
		assert.Equal(t, right_documents[i].Scores, foundDocuments[i].Scores)
	}
}
