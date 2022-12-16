import pika
from features.constants import BROKER_SETTINGS
import threading
from features.singleton import Singleton


class Consumer(metaclass=Singleton):
    '''Получаем сообщение из RabbitMQ

    Атрибуты:
        _connection - соединение
        _channel - канал соединения
    '''

    _connection: None
    _channel: None

    def __init__(self):
        '''Инициализуруем работы очереди'''
        credentials = pika.PlainCredentials(
            BROKER_SETTINGS['RABBITMQ_USERNAME'],
            BROKER_SETTINGS['RABBITMQ_PASSWORD'],
        )

        self._connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=BROKER_SETTINGS['RABBITMQ_HOST'],
                port=BROKER_SETTINGS['RABBITMQ_PORT'],
                credentials=credentials,
            )
        )

        self._channel = self._connection.channel()
        self._channel.exchange_declare('document', durable=True, exchange_type='topic')
        self._channel.basic_consume(
            queue='API',
            on_message_callback=self._callback,
            auto_ack=True,
        )

        self.start()

    def start(self):
        '''Начинаем поток для чтения сообщений из очереди
        '''
        self._thread = threading.Thread(target=self._channel.start_consuming)
        self._thread.start()

    def _callback(self, channel, method, properties, body):
        '''Читаем наше сообщение, а затем предсказываем, спам ли это или нет'''
        message = body.decode("utf-8")
        # Предсказывание модели
