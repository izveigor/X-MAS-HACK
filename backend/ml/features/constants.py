import os
from typing import Any

BROKER_SETTINGS: dict[str, Any] = {
    "RABBITMQ_USERNAME": os.environ.get("RABBITMQ_USERNAME"),
    "RABBITMQ_PASSWORD": os.environ.get("RABBITMQ_PASSWORD"),
    "RABBITMQ_HOST": os.environ.get("RABBITMQ_HOST"),
    "RABBITMQ_PORT": os.environ.get("RABBITMQ_PORT"),
}

ID_SIZE: int = 24

MODEL_PATH: str = "./model/model.pkl"
VECTORIZER_PATH: str = "./model/vectorizer.pkl"

TYPES: list[str] = [
    "Договор поставки",
    "Договор оказания услуг",
    "Договор подряда",
    "Договор аренды",
    "Договор купли-продажи",
]
