package broker

import (
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	rabbitmq "github.com/wagslane/go-rabbitmq"
)

type Broker struct {
	Publisher *rabbitmq.Publisher
}

func NewBroker(publisher *rabbitmq.Publisher) *Broker {
	return &Broker{Publisher: publisher}
}

var broker *Broker

func ConnectPublisher() {
	conn, err := rabbitmq.NewConn(
		config.Config.RMQUrl,
		rabbitmq.WithConnectionOptionsLogging,
	)
	if err != nil {
		log.Fatal(err)
	}

	publisher, err := rabbitmq.NewPublisher(
		conn,
		rabbitmq.WithPublisherOptionsLogging,
		rabbitmq.WithPublisherOptionsExchangeName("document"),
		rabbitmq.WithPublisherOptionsExchangeDeclare,
	)
	if err != nil {
		log.Fatal(err)
	}

	broker = NewBroker(publisher)
}

func Publish(body []byte) error {
	err := broker.Publisher.Publish(
		[]byte(body),
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
