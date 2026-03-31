#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chatCompletionSchema, handleChatCompletion } from "./tools/chat.js";
import { handleListModels } from "./tools/models.js";
import { getEmbeddingsSchema, handleGetEmbeddings } from "./tools/embeddings.js";

const server = new McpServer({
  name: "gigachat-mcp",
  version: "1.0.0",
});

server.tool(
  "chat_completion",
  "Генерация текста через GigaChat. Поддерживает диалог с системным промптом.",
  chatCompletionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleChatCompletion(params) }] }),
);

server.tool(
  "list_models",
  "Список доступных моделей GigaChat.",
  {},
  async () => ({ content: [{ type: "text", text: await handleListModels() }] }),
);

server.tool(
  "get_embeddings",
  "Получение векторных представлений (эмбеддингов) текстов через GigaChat.",
  getEmbeddingsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetEmbeddings(params) }] }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[gigachat-mcp] Server started. 3 tools. Requires GIGACHAT_AUTH_KEY.");
}

main().catch((error) => {
  console.error("[gigachat-mcp] Error:", error);
  process.exit(1);
});
