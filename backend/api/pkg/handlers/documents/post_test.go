package documents

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/hashicorp/go-hclog"
	"github.com/izveigor/X-MAS-HACK/pkg/broker"
	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"github.com/stretchr/testify/assert"
	rabbitmq "github.com/wagslane/go-rabbitmq"
)

func TestPost(t *testing.T) {
	go db.ConnectToMongo()
	broker.ConnectToBroker()
	broker.StartPublisher()
	text := []byte("Текст...")
	_, err := rabbitmq.NewConsumer(
		broker.RabbitMQBroker.Conn,
		func(delivery rabbitmq.Delivery) rabbitmq.Action {
			body := delivery.Body
			if len(body) != 24+len(text) {
				t.Fatal("Broker error")
			}
			return rabbitmq.Ack
		},
		"document",
		rabbitmq.WithConsumerOptionsRoutingKey("AM"),
		rabbitmq.WithConsumerOptionsExchangeName("document"),
		rabbitmq.WithConsumerOptionsExchangeDeclare,
	)

	if err != nil {
		t.Fatal(err)
	}
	defer func() {
		db.DocumentsCollection.Drop(context.TODO())
	}()

	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("files", "file.txt")
	part.Write(text)
	writer.Close()

	fmt.Println(body)
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/documents", body)
	ctx := context.WithValue(req.Context(), KeyUUID{}, UUID{Value: "123"})
	req = req.WithContext(ctx)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	l := hclog.Default()
	documentsHandler := NewDocuments(l)
	documentsHandler.CreateDocument(wr, req)
	assert.Equal(t, wr.Code, http.StatusOK)

	var result []*db.Document
	if err := json.Unmarshal([]byte(wr.Body.String()), &result); err != nil {
		t.Fatal(err)
	}

	documents, err := db.FindDocuments(1, "123")
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, documents[0].Uuid, "123")
	assert.Equal(t, documents[0].Name, "file.txt")
	assert.Equal(t, documents[0].Status, "Анализ")
}
