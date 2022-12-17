package documents

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/hashicorp/go-hclog"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestGet(t *testing.T) {
	db.ConnectToMongo()
	defer func() {
		db.DocumentsCollection.Drop(context.TODO())
	}()

	firstDocument := db.Document{
		Id:         primitive.NewObjectID(),
		KeyPhrases: []string{"A", "B"},
		Uuid:       "123",
		Name:       "name",
		Date:       time.Date(2009, time.November, 10, 23, 0, 30, 0, time.UTC),
		Status:     "Готово",
		Types:      []string{"Аренда", "Продажа"},
		Scores:     []float32{0.69, 0.79},
	}
	secondDocument := db.Document{
		Id:         primitive.NewObjectID(),
		KeyPhrases: []string{"A", "B"},
		Uuid:       "234",
		Name:       "name",
		Date:       time.Date(2009, time.November, 10, 23, 0, 30, 1, time.UTC),
		Status:     "Готово",
		Types:      []string{"Продажа", "Аренда"},
		Scores:     []float32{0.61, 0.71},
	}

	documents := []interface{}{
		firstDocument,
		secondDocument,
	}

	if _, err := db.DocumentsCollection.InsertMany(context.TODO(), documents); err != nil {
		t.Fatal(err)
	}

	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/documents?page=1", nil)
	ctx := context.WithValue(req.Context(), KeyUUID{}, UUID{Value: "123"})
	req = req.WithContext(ctx)
	req.Header.Set("Authorization", "Token 111")

	l := hclog.Default()
	documentsHandler := NewDocuments(l)
	documentsHandler.GetDocuments(wr, req)
	assert.Equal(t, wr.Code, http.StatusOK)

	var result []*db.Document
	if err := json.Unmarshal([]byte(wr.Body.String()), &result); err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, result[0].KeyPhrases, firstDocument.KeyPhrases)
	assert.Equal(t, result[0].Name, firstDocument.Name)
	assert.Equal(t, result[0].Date, firstDocument.Date)
	assert.Equal(t, result[0].Status, firstDocument.Status)
	assert.Equal(t, result[0].Types, firstDocument.Types)
	assert.Equal(t, result[0].Scores, firstDocument.Scores)
}
