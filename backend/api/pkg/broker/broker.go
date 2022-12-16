package broker

import (
	"log"

	"github.com/izveigor/X-MAS-HACK/pkg/config"
	rabbitmq "github.com/wagslane/go-rabbitmq"
)

type Broker struct {
	Conn      *rabbitmq.Conn
	Publisher *rabbitmq.Publisher
	Consumer  *rabbitmq.Consumer
}

func NewBroker(conn *rabbitmq.Conn) *Broker {
	return &Broker{Publisher: nil, Consumer: nil, Conn: conn}
}

var RabbitMQBroker *Broker

func ConnectToBroker() {
	conn, err := rabbitmq.NewConn(
		config.Config.RMQUrl,
		rabbitmq.WithConnectionOptionsLogging,
	)

	if err != nil {
		log.Fatal(err)
	}
	RabbitMQBroker = NewBroker(conn)
}
