package broker

import (
	"context"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type SentData struct {
	Id          string
	FileContent []byte
}

func StartPublisher() {
	ch, err := RabbitMQBroker.Conn.Channel()
	if err != nil {
		panic(err)
	}

	defer func() {
		_ = ch.Close()
	}()

	_, err = ch.QueueDeclare(
		"AM",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}
}

func Publish(Id []byte, FileContent []byte) error {
	ch, err := RabbitMQBroker.Conn.Channel()
	if err != nil {
		return err
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
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = ch.PublishWithContext(
		ctx,
		"",
		q.Name,
		false,
		false,
		amqp.Publishing{
			Body: append(Id, FileContent...),
		})

	if err != nil {
		return err
	}
	return nil
}
