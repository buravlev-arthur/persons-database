![example workflow](https://github.com/buravlev-arthur/blacklist-animals/actions/workflows/deployProject.yml/badge.svg)

# Бэкенд сервиса "Чёрный список владельцев животных"

Проект включает в себя API-сервер и парсер данных из старой базы данных с генерацией новой нормализованной БД.

- Реализация: Express (NodeJS) + Typescript
- Автотесты: Jest + Supertest
- Контроль за качеством кода: ESLint + Prettier, Husky

## Использование

```bash
# Сервер
node dist/bin/server.js
# Парсер
node dist/bin/parser.js
```

## Разработка

### Установка проекта

```bash
make install
```

В корне проекта создать файл `.env` со следующим содержимым:

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

### Линтинг и форматирование:

```bash
make lint
make prettier
```

### Тестирование

```bash
make test
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
