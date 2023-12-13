![example workflow](https://github.com/buravlev-arthur/blacklist-animals/actions/workflows/deployProject.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ef293db0866c9626764/maintainability)](https://codeclimate.com/github/buravlev-arthur/persons-database/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ef293db0866c9626764/test_coverage)](https://codeclimate.com/github/buravlev-arthur/persons-database/test_coverage)

# База данных лиц

Проект включает в себя API-сервер, фронтенд-часть и парсер данных из старой базы данных с генерацией новой нормализованной БД.

## Стек технологий

- Бэкенд: Express (NodeJS), Typescript
- Фронтенд: Vue 3, Typescript, Quasar Framework 2
- Тестирование: Jest, Supertest
- Качество кода: ESLint, Prettier, Husky

## Использование

```bash
# Сервер
node dist/bin/server.js
# Запуск сервера в pm2
pm2 start --name Persons-DB ./dist/bin/server.js

# Парсер
node dist/bin/parser.js
```

## Разработка (backend)

### Установка проекта

```bash
make install
```

В корне проекта необходимо создать файл `.env` со следующим содержимым:

```text
OLD_DB_HOST="<ip or domain>"
OLD_DB_USER="<user name>"
OLD_DB_PASSWORD="<password>"
OLD_DB_NAME="<database name>"
NEW_DB_HOST="<ip or domain>"
NEW_DB_USER="<user name>"
NEW_DB_PASSWORD="<password>"
NEW_DB_NAME="<database name>"
NEW_DB_PORT="<port>"
MAIL_USER="<sender email address>"
MAIL_PASSWORD="<mail service password>"
MAIL_TO="<reciever email address>"
```

### Линтинг и форматирование кода

```bash
make lint
make prettier
```

### Тестирование

```bash
# прогон тестов
make test
# тестовое покрытие кода
make test-coverage
```

### Сборка

```bash
# js-файлы компилируются в директорию "/dist"
make build
```

### Процесс разработки

```bash
# Консоль 1: Пересборка проекта при изменении .ts-файлов
make watch
```

```bash
# Консоль 2: Запуск скрипта проекта через nodemon
npm i --global nodemon # Если nodemon не установлен глобально в системе
nodemon dist/bin/server.js
```

## Разработка (frontend)

```bash
# директория с кодом фронтенд-части приложения
cd frontend
# установка
npm install
# запуск dev-сервера
quasar dev
# сборка проекта (в директорию dist)
quasar build
# линтинг кода
npm run lint
# форматирование кода
npm run format
```
