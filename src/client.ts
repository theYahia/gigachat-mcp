import type { OAuthTokenResponse } from "./types.js";

const API_BASE = "https://gigachat.devices.sberbank.ru/api/v1";
const OAUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const TIMEOUT = 30_000;
const MAX_RETRIES = 3;

class TokenManager {
  private token: string | null = null;
  private expiresAt = 0;

  async getToken(): Promise<string> {
    const now = Date.now();
    if (this.token && now < this.expiresAt - 60_000) {
      return this.token;
    }

    const authKey = process.env.GIGACHAT_AUTH_KEY;
    if (!authKey) throw new Error("GIGACHAT_AUTH_KEY is not set");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(OAUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "Authorization": `Basic ${authKey}`,
          "RqUID": crypto.randomUUID(),
        },
        body: "scope=GIGACHAT_API_PERS",
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`OAuth error ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as OAuthTokenResponse;
      this.token = data.access_token;
      this.expiresAt = data.expires_at;
      return this.token;
    } catch (error) {
      clearTimeout(timer);
      throw error;
    }
  }
}

const tokenManager = new TokenManager();

export async function gigachatGet(path: string): Promise<unknown> {
  return gigachatRequest("GET", path);
}

export async function gigachatPost(path: string, body: unknown): Promise<unknown> {
  return gigachatRequest("POST", path, body);
}

async function gigachatRequest(method: string, path: string, body?: unknown): Promise<unknown> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const token = await tokenManager.getToken();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.ok) return response.json();

      if ((response.status === 429 || response.status >= 500) && attempt < MAX_RETRIES) {
        const delay = Math.min(1000 * 2 ** (attempt - 1), 8000);
        console.error(`[gigachat-mcp] ${response.status}, retry in ${delay}ms (${attempt}/${MAX_RETRIES})`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      throw new Error(`GigaChat HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError" && attempt < MAX_RETRIES) {
        console.error(`[gigachat-mcp] Timeout, retry (${attempt}/${MAX_RETRIES})`);
        continue;
      }
      throw error;
    }
  }
  throw new Error("GigaChat: all retries exhausted");
}
