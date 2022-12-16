import os


BROKER_SETTINGS = {
    "RABBITMQ_USERNAME": os.environ.get("RABBITMQ_USERNAME"),
    "RABBITMQ_PASSWORD": os.environ.get("RABBITMQ_PASSWORD"),
    "RABBITMQ_HOST": os.environ.get("RABBITMQ_HOST"),
    "RABBITMQ_PORT": os.environ.get("RABBITMQ_PORT"),
}
