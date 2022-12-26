package broker

import (
	"encoding/json"
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/db"
)

type ReceivedData struct {
	Id         string    `json:"id"`
	Types      []string  `json:"types"`
	Scores     []float32 `json:"scores"`
	KeyPhrases []string  `json:"key_phrases"`
}

func StartConsumer() {
	ch, err := RabbitMQBroker.Conn.Channel()
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		_ = ch.Close()
	}()

	q, err := ch.QueueDeclare(
		"MA",
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

	for {
		for message := range messages {
			var receivedData *ReceivedData
			json.Unmarshal(message.Body, &receivedData)
			_, err := db.UpdateDocument(
				receivedData.Id,
				receivedData.Types,
				receivedData.Scores,
				receivedData.KeyPhrases,
			)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}
