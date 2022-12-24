import json
from dataclasses import dataclass

import pika
from pika.adapters.blocking_connection import BlockingChannel

from features.constants import BROKER_SETTINGS
from features.singleton import Singleton


@dataclass
class SentData:
    id: str
    scores: list[float]
    types: list[str]
    key_phrases: list[str]


class Publisher(metaclass=Singleton):
    """Отправляем наши предсказания в очередь.

    Атрибуты:
        _connection - соединение
        _channel - канал соединения
    """

    _connection: pika.BlockingConnection
    _channel: BlockingChannel

    def __init__(self) -> None:
        """Инициализируем отправителя"""
        credentials = pika.PlainCredentials(
            BROKER_SETTINGS["RABBITMQ_USERNAME"],
            BROKER_SETTINGS["RABBITMQ_PASSWORD"],
        )
        self._connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=BROKER_SETTINGS["RABBITMQ_HOST"],
                port=BROKER_SETTINGS["RABBITMQ_PORT"],
                credentials=credentials,
            )
        )

        self._channel = self._connection.channel()
        self._channel.queue_declare(queue="MA")
        self._channel.queue_bind(queue="MA", routing_key="ML", exchange="document")

    def publish(self, data: SentData) -> None:
        """Публикуем сообщение в очередь"""
        print(data)
        try:
            json_data = json.dumps(
                {
                    "id": data.id,
                    "types": data.types,
                    "scores": data.scores,
                    "key_phrases": data.key_phrases,
                }
            )
        except Exception as e:
            print(e)
        else:
            self._channel.basic_publish(routing_key="ML", exchange="document", body=json_data)
