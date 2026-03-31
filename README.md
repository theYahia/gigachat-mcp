# @theyahia/gigachat-mcp

MCP server for the Sber GigaChat API — chat completions, model listing, and text embeddings.

## Tools

| Tool | Description |
|------|-------------|
| `chat_completion` | Generate text via GigaChat models with dialog support |
| `list_models` | List available GigaChat models |
| `get_embeddings` | Get vector embeddings for text inputs |

## Setup

1. Get your GigaChat API credentials at https://developers.sber.ru/
2. Set the `GIGACHAT_AUTH_KEY` environment variable (Base64-encoded `client_id:client_secret`)

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gigachat": {
      "command": "npx",
      "args": ["-y", "@theyahia/gigachat-mcp"],
      "env": {
        "GIGACHAT_AUTH_KEY": "your-auth-key"
      }
    }
  }
}
```

## Authentication

The server automatically obtains and caches OAuth bearer tokens using the `GIGACHAT_AUTH_KEY`. Tokens are refreshed before expiry.

## License

MIT
