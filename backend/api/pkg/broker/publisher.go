package broker

import (
	"log"

	rabbitmq "github.com/wagslane/go-rabbitmq"
)

type SentData struct {
	Id          string
	FileContent []byte
}

func StartPublisher() {
	publisher, err := rabbitmq.NewPublisher(
		RabbitMQBroker.Conn,
		rabbitmq.WithPublisherOptionsLogging,
		rabbitmq.WithPublisherOptionsExchangeName("document"),
		rabbitmq.WithPublisherOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}

	RabbitMQBroker.Publisher = publisher
}

func Publish(FileContent []byte) error {
	err := RabbitMQBroker.Publisher.Publish(
		[]byte(FileContent),
		[]string{"api"},
		rabbitmq.WithPublishOptionsContentType("application/json"),
		rabbitmq.WithPublishOptionsMandatory,
		rabbitmq.WithPublishOptionsPersistentDelivery,
		rabbitmq.WithPublishOptionsExchange("document"),
	)
	if err != nil {
		return err
	}
	return nil
}
