package broker

import (
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	amqp "github.com/rabbitmq/amqp091-go"
)

type Broker struct {
	Conn *amqp.Connection
}

func NewBroker(conn *amqp.Connection) *Broker {
	return &Broker{Conn: conn}
}

var RabbitMQBroker *Broker

func ConnectToBroker() {
	conn, err := amqp.Dial(config.Config.RMQUrl)

	if err != nil {
		log.Fatal(err)
	}
	RabbitMQBroker = NewBroker(conn)
}
