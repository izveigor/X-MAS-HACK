package db

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestSortTypes(t *testing.T) {
	var types []string = []string{"Договор поставки", "Договор оказания услуг", "Договор подряда", "Договор аренды", "Договор купли-продажи"}
	var scores []float32 = []float32{0.02, 0.83, 0.08, 0.01, 0.06}

	sortedTypes, sortedScores := sortTypes(types, scores)

	assert.Equal(t, sortedTypes, []string{"Договор оказания услуг", "Договор подряда", "Договор купли-продажи", "Договор поставки", "Договор аренды"})
	assert.Equal(t, sortedScores, []float32{0.83, 0.08, 0.06, 0.02, 0.01})
}

func TestUpdateDocument(t *testing.T) {
	defer func() {
		DocumentsCollection.Drop(context.TODO())
	}()
	ConnectToMongo()

	id := primitive.NewObjectID()
	var hexId string = id.Hex()
	document := Document{
		Id:         id,
		KeyPhrases: []string{},
		Uuid:       "123",
		Name:       "0b4be82b86eff410d69d1d6b5553.docx",
		Date:       time.Now(),
		Status:     "Готово",
		Types:      []string{},
		Scores:     []float32{},
	}

	if _, err := DocumentsCollection.InsertOne(context.TODO(), document); err != nil {
		t.Fatal(err)
	}

	var types []string = []string{"Договор поставки", "Договор оказания услуг", "Договор подряда", "Договор аренды", "Договор купли-продажи"}
	var scores []float32 = []float32{0.02, 0.83, 0.08, 0.01, 0.06}
	var keyPhrases []string = []string{"образовательной", "договора", "исполнителя", "российской", "федерации"}

	updatedDocument, err := UpdateDocument(hexId, types, scores, keyPhrases)
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, updatedDocument.Id, document.Id)
	assert.Equal(t, updatedDocument.KeyPhrases, keyPhrases)
	assert.Equal(t, updatedDocument.Types, []string{"Договор оказания услуг", "Договор подряда", "Договор купли-продажи", "Договор поставки", "Договор аренды"})
	assert.Equal(t, updatedDocument.Scores, []float32{0.83, 0.08, 0.06, 0.02, 0.01})
}
