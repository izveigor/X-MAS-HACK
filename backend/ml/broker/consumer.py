import threading
from typing import Any

import pika
from pika.adapters.blocking_connection import BlockingChannel

from features.constants import BROKER_SETTINGS, ID_SIZE
from features.singleton import Singleton
from model.model import DocumentModel


class Consumer(metaclass=Singleton):
    """Получаем сообщение из RabbitMQ

    Атрибуты:
        _connection - соединение
        _channel - канал соединения
    """

    _connection: pika.BlockingConnection
    _channel: BlockingChannel

    def __init__(self) -> None:
        """Инициализуруем работы очереди"""
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
        self._channel.exchange_declare("document", durable=False, exchange_type="direct")
        self._channel.basic_consume(
            queue="API",
            on_message_callback=self._callback,
            auto_ack=True,
        )

        self.start()

    def start(self) -> None:
        """Начинаем поток для чтения сообщений из очереди"""
        self._thread = threading.Thread(target=self._channel.start_consuming)
        self._thread.start()

    def _callback(self, channel: Any, method: Any, properties: Any, body: bytes) -> None:
        """Читаем наше сообщение, а затем предсказываем, спам ли это или нет"""
        id_, file = body[:ID_SIZE].decode("utf-8"), body[ID_SIZE:]
        DocumentModel().predict(id_, file)
