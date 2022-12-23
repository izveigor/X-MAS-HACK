import os


BROKER_SETTINGS = {
    "RABBITMQ_USERNAME": os.environ.get("RABBITMQ_USERNAME"),
    "RABBITMQ_PASSWORD": os.environ.get("RABBITMQ_PASSWORD"),
    "RABBITMQ_HOST": os.environ.get("RABBITMQ_HOST"),
    "RABBITMQ_PORT": os.environ.get("RABBITMQ_PORT"),
}

ID_SIZE = 24

MODEL_PATH = "./model.pkl"
TYPES = [
    "Договоры для акселератора/Договоры поставки",
    "Договоры для акселератора/Договоры оказания услуг",
    "Договоры для акселератора/Договоры подряда",
    "Договоры для акселератора/Договоры аренды",
    "Договоры для акселератора/Договоры купли-продажи",
]
