# Builder
FROM python:3.10 as builder
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

# Main
FROM python:3.10
RUN mkdir -p /home/app

ENV APP_HOME=/home/app/backend/ml
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --no-cache /wheels/*
RUN python -m nltk.downloader stopwords wordnet

COPY . $APP_HOME