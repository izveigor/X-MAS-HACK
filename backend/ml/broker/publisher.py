from dataclasses import dataclass

import pika
from pika.adapters.blocking_connection import BlockingChannel

from features.constants import BROKER_SETTINGS
from features.singleton import Singleton
import json


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
        self._channel.queue_declare(queue="ML")
        self._channel.queue_bind(queue="ML", routing_key="AM")

    def publish(self, data: SentData) -> None:
        """Публикуем сообщение в очередь"""
        try:
            json_data = json.dumps(data)
        except Exception as e:
            print(e)

        self._channel.basic_publish(routing_key="AM", body=json_data)
