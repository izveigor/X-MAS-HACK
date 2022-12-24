# X-MAS-HACK ![Api-tests](https://github.com/izveigor/X-MAS-HACK/actions/workflows/api-tests.yml/badge.svg) ![ML-tests](https://github.com/izveigor/X-MAS-HACK/actions/workflows/ml-tests.yml/badge.svg)
Решение команды MISIS - Apollo на хакатоне X-MAS-HACK-2022
![Дизайн](https://user-images.githubusercontent.com/68601180/208240779-afbd1d41-2381-4843-8c1b-9786d34df8fc.png)
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
