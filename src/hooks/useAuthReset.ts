// src/hooks/useAuthReset.ts
"use client";

export type RequestResetResult = {
  success: boolean;
  message: string;
  expiresAt?: string;
};

export type ResetPasswordResult = {
  success: boolean;
  message: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
async function postJSON<T = any>(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error("Respuesta inválida del servidor", { cause: err });
  }

  if (!res.ok) {
    // Si backend devuelve { success: false, message, errors? } respetamos eso
    const msg = json?.message || json?.error || "Error en la petición";
    const errors = json?.errors;
    const err = new Error(msg);
    // @ts-expect-error attach extra info
    err.details = { status: res.status, errors, raw: json };
    throw err;
  }

  return json as T;
}

export function useAuthResetApi() {
  async function requestReset(email: string): Promise<RequestResetResult> {
    return postJSON<RequestResetResult>("/api/auth/request-reset", { email });
  }

  async function resetPassword(token: string, newPassword: string): Promise<ResetPasswordResult> {
    return postJSON<ResetPasswordResult>("/api/auth/reset-password", { token, newPassword });
  }

  return { requestReset, resetPassword };
}
