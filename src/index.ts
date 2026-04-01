#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chatCompletionSchema, handleChatCompletion } from "./tools/chat.js";
import { handleListModels } from "./tools/models.js";
import { getEmbeddingsSchema, handleGetEmbeddings } from "./tools/embeddings.js";
import { getTokenCountSchema, handleGetTokenCount } from "./tools/token-count.js";
import { generateImageSchema, handleGenerateImage } from "./tools/generate-image.js";
import { handleGetBalance } from "./tools/balance.js";
import { handleListAssistants } from "./tools/assistants.js";
import { fileUploadSchema, handleFileUpload } from "./tools/file-upload.js";

const server = new McpServer({
  name: "gigachat-mcp",
  version: "2.0.0",
});

server.tool(
  "chat",
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
  "embed_text",
  "Получение векторных представлений (эмбеддингов) текстов через GigaChat.",
  getEmbeddingsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetEmbeddings(params) }] }),
);

server.tool(
  "get_token_count",
  "Подсчёт токенов для массива текстов.",
  getTokenCountSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetTokenCount(params) }] }),
);

server.tool(
  "generate_image",
  "Генерация изображения через GigaChat (описание в тексте сообщения).",
  generateImageSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGenerateImage(params) }] }),
);

server.tool(
  "get_balance",
  "Проверка остатка токенов/квоты GigaChat.",
  {},
  async () => ({ content: [{ type: "text", text: await handleGetBalance() }] }),
);

server.tool(
  "list_assistants",
  "Список доступных ассистентов GigaChat.",
  {},
  async () => ({ content: [{ type: "text", text: await handleListAssistants() }] }),
);

server.tool(
  "file_upload",
  "Загрузка файла в GigaChat для мультимодальной обработки.",
  fileUploadSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleFileUpload(params) }] }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[gigachat-mcp] Server started. 8 tools. Requires GIGACHAT_AUTH_KEY.");
}

main().catch((error) => {
  console.error("[gigachat-mcp] Error:", error);
  process.exit(1);
});
