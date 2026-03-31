# @theyahia/gigachat-mcp

MCP-сервер для Sber GigaChat API — генерация текста, список моделей, эмбеддинги. **3 инструмента.**

[![npm](https://img.shields.io/npm/v/@theyahia/gigachat-mcp)](https://www.npmjs.com/package/@theyahia/gigachat-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Часть серии [Russian API MCP](https://github.com/theYahia/russian-mcp) (50 серверов) by [@theYahia](https://github.com/theYahia).

## Установка

### Claude Desktop

```json
{
  "mcpServers": {
    "gigachat": {
      "command": "npx",
      "args": ["-y", "@theyahia/gigachat-mcp"],
      "env": { "GIGACHAT_AUTH_KEY": "your-auth-key" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add gigachat -e GIGACHAT_AUTH_KEY=your-auth-key -- npx -y @theyahia/gigachat-mcp
```

### VS Code / Cursor

```json
{ "servers": { "gigachat": { "command": "npx", "args": ["-y", "@theyahia/gigachat-mcp"], "env": { "GIGACHAT_AUTH_KEY": "your-auth-key" } } } }
```

> Требуется `GIGACHAT_AUTH_KEY` (Base64-encoded `client_id:client_secret`). Получите на [developers.sber.ru](https://developers.sber.ru). Токены OAuth обновляются автоматически.

## Инструменты (3)

| Инструмент | Описание |
|------------|----------|
| `chat_completion` | Генерация текста через GigaChat с поддержкой диалога |
| `list_models` | Список доступных моделей GigaChat |
| `get_embeddings` | Получение векторных представлений текстов |

## Примеры

```
Сгенерируй текст через GigaChat: "Напиши стихотворение о весне"
Покажи список доступных моделей GigaChat
Получи эмбеддинги для текстов ["Привет", "Мир"]
```

## Лицензия

MIT
