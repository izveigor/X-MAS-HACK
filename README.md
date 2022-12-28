# X-MAS-HACK ![Api-tests](https://github.com/izveigor/X-MAS-HACK/actions/workflows/api-tests.yml/badge.svg) ![ML-tests](https://github.com/izveigor/X-MAS-HACK/actions/workflows/ml-tests.yml/badge.svg)
Решение команды MISIS - Apollo на хакатоне X-MAS-HACK-2022
![main](https://user-images.githubusercontent.com/68601180/209818356-babdd64b-805d-4a6e-8388-bf8826f46836.png)
![register](https://user-images.githubusercontent.com/68601180/209818361-80a92b55-bfe7-4da6-90ed-e1e82eae5516.png)
# Запуск
Чтобы запустить все микросервисы и frontend, файл "entrypoint.sh" использует контейнеры "Docker".
```
$ ./entrypoint.sh
```
# Архитектура
![Архитектура](https://user-images.githubusercontent.com/68601180/208241428-10ef568d-acf5-4c4d-8a17-7ff1b5d608f0.JPG)

## Паттерны
- API Gateway
- Microservice architecture
- Database per service
- Pub-Sub

# Стек
## Backend:
В качестве языков программирования используются:
### Python (в случае большой гибкости и прямого взаимодействия с ML):
- Брокер: pika
- Тестирование: pytest
- Lint: black, isort
- Другие инструменты: mypy

### Golang (в случае работы с websocket и произоводительности):
- Фреймворк: gorilla
- Тестирование: testify
- Lint: golangci-lint
- БД: mongodb, 

### Java (в случае надежности и быстрой реализации паттернов)
- Фреймворк: Spring Framework
- Тестирование: JUnit
- Lint: Checkstyle
### Другие технологии:
- Соединения между микросервисами: Protocol Buffers
- Веб-сервер: Nginx

DevOps:
- OC: Ubuntu 20.04
- Контейнеризация: Docker

## Frontend:
### TypeScript
- Фреймворк: React
- Тестирование: jest
- Lint: ESLint
- Стилизация: styled-components
