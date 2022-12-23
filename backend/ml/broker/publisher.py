import pika
from features.constants import BROKER_SETTINGS
from features.singleton import Singleton
from dataclasses import dataclass


@dataclass
class SentData:
    id: str
    scores: list[str]
    types: list[float]
    key_phrases: list[str]


class Publisher(metaclass=Singleton):
    '''Отправляем наши предсказания в очередь.

    Атрибуты:
        _connection - соединение
        _channel - канал соединения
    '''

    _connection: None
    _channel: None

    def __init__(self):
        '''Инициализируем отправителя
        '''
        credentials = pika.PlainCredentials(
            BROKER_SETTINGS['RABBITMQ_USERNAME'],
            BROKER_SETTINGS['RABBITMQ_PASSWORD'],
        )
        self._connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=BROKER_SETTINGS['RABBITMQ_HOST'],
            port=BROKER_SETTINGS['RABBITMQ_PORT'],
            credentials=credentials,
        ))

        self._channel = self._connection.channel()
        self._channel.queue_declare(queue='ML')
        self._channel.queue_bind(queue='ML', routing_key='AM')

    def publish(self, data: SentData):
        '''Публикуем сообщение в очередь'''
        self._channel.basic_publish(routing_key='AM', body=data)
