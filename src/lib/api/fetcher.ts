// src/lib/api/fetcher.ts
import { fetchConfig } from "../react-query/config";
export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchConfig.timeoutMs);

  const headers = new Headers(init?.headers);
  if (init?.json !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  // Cookies de sesión, CSRF, etc.
  const res = await fetch(input, {
    ...init,
    method: init?.json ? init?.method ?? 'POST' : init?.method,
    credentials: 'include',
    cache: 'no-store',
    signal: controller.signal,
    headers,
    body: init?.json ? JSON.stringify(init.json) : init?.body,
  });

  clearTimeout(timeout);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let data: any = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || res.statusText;
    throw new Error(message);
  }

  return data as T;
}
