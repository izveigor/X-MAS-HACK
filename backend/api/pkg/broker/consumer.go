package broker

import (
	"encoding/json"
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/db"
	"github.com/izveigor/X-MAS-HACK/pkg/handlers/websockets"
	rabbitmq "github.com/wagslane/go-rabbitmq"
)

type ReceivedData struct {
	Id         string    `json:"id"`
	Types      []string  `json:"types"`
	Scores     []float32 `json:"scores"`
	KeyPhrases []string  `json:key_phrases`
}

func StartConsumer() {
	consumer, err := rabbitmq.NewConsumer(
		RabbitMQBroker.Conn,
		func(delivery rabbitmq.Delivery) rabbitmq.Action {
			var receivedData *ReceivedData
			json.Unmarshal(delivery.Body, &receivedData)
			document, err := db.UpdateDocument(
				receivedData.Id,
				receivedData.Types,
				receivedData.Scores,
				receivedData.KeyPhrases,
			)
			if err != nil {
				log.Fatal(err)
				return rabbitmq.Ack
			}
			client := websockets.WebsocketHub.FindClient(document.Uuid)
			if client != nil {
				client.SendDocumentInformation(document)
			}
			return rabbitmq.Ack
		},
		"AM",
		rabbitmq.WithConsumerOptionsRoutingKey("ml"),
		rabbitmq.WithConsumerOptionsExchangeName("document"),
		rabbitmq.WithConsumerOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}

	RabbitMQBroker.Consumer = consumer
}
