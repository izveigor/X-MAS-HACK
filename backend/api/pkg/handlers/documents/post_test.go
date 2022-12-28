package documents

import (
	"bytes"
	"context"
	"log"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/hashicorp/go-hclog"
	"github.com/izveigor/X-MAS-HACK/pkg/broker"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"github.com/stretchr/testify/assert"
)

func TestPost(t *testing.T) {
	go db.ConnectToMongo()
	broker.ConnectToBroker()
	broker.StartPublisher()
	text := []byte("Текст...")

	ch, err := broker.RabbitMQBroker.Conn.Channel()
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		_ = ch.Close()
	}()

	q, err := ch.QueueDeclare(
		"AM",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}

	messages, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	defer func() {
		db.DocumentsCollection.Drop(context.TODO())
	}()

	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("files", "file.txt")
	part.Write(text)
	writer.Close()

	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/documents", body)
	ctx := context.WithValue(req.Context(), KeyUUID{}, UUID{Value: "123"})
	req = req.WithContext(ctx)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	l := hclog.Default()
	documentsHandler := NewDocuments(l)
	documentsHandler.CreateDocument(wr, req)
	assert.Equal(t, wr.Code, http.StatusOK)

	documents, err := db.FindDocuments(1, "123")
	if err != nil {
		t.Fatal(err)
	}

	go func() {
		for message := range messages {
			var id string = string(message.Body[:24])
			var file []byte = message.Body[24:]
			assert.Equal(t, id, documents[0].Id.Hex())
			assert.Equal(t, file, text)
		}
	}()
}
