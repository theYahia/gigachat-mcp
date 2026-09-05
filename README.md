> ## 🗄 Репозиторий заархивирован
>
> Разработка переехала в **[theYahia/WWmcp](https://github.com/theYahia/WWmcp)** — монорепозиторий MCP-серверов для незападных API: СНГ, MENA, Африка, LATAM, Юго-Восточная Азия. Общее ядро `@theyahia/mcp-core`, единый CI, единый релизный конвейер.
>
> Актуальная версия того, что лежало здесь: [`servers/gigachat/`](https://github.com/theYahia/WWmcp/tree/main/servers/gigachat)
>
> Пакет в npm прежний — [`@theyahia/gigachat-mcp`](https://www.npmjs.com/package/@theyahia/gigachat-mcp), ставится и работает как раньше.
> Здесь больше ничего не обновляется. Задачи и pull request'ы — в WWmcp.
>
> **Archived — development moved to [theYahia/WWmcp](https://github.com/theYahia/WWmcp),** a monorepo of MCP servers for non-Western APIs.
> The current version of this package now lives at [`servers/gigachat/`](https://github.com/theYahia/WWmcp/tree/main/servers/gigachat).
> The npm package [`@theyahia/gigachat-mcp`](https://www.npmjs.com/package/@theyahia/gigachat-mcp) is unchanged.
> Please open issues and pull requests there.

# @theyahia/gigachat-mcp

MCP-сервер для Sber GigaChat API — чат, эмбеддинги, генерация изображений, подсчёт токенов, баланс, ассистенты, файлы. **8 инструментов.**

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

## Инструменты (8)

| Инструмент | Описание |
|------------|----------|
| `chat` | Генерация текста через GigaChat с диалогом |
| `list_models` | Список доступных моделей |
| `embed_text` | Получение эмбеддингов текстов |
| `get_token_count` | Подсчёт токенов для текстов |
| `generate_image` | Генерация изображения через GigaChat |
| `get_balance` | Остаток токенов/квоты |
| `list_assistants` | Список ассистентов |
| `file_upload` | Загрузка файла для мультимодальной обработки |

## Демо-промпты

```
Спроси GigaChat: "Напиши стихотворение о весне"
Покажи список доступных моделей GigaChat
Получи эмбеддинги для текстов ["Привет", "Мир"]
Посчитай токены в тексте "Привет, мир!"
Нарисуй через GigaChat котика в шляпе
Покажи баланс GigaChat
Загрузи файл в GigaChat для анализа
```

## Лицензия

MIT

---

Telegram: [@vhodvai](https://t.me/vhodvai)
