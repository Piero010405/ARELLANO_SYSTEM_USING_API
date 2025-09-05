// lib/metadata.ts
import type { Metadata } from "next";

export function buildMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} | Auditoria Arellano`,
    description: description ?? "Sistema Interno del Área de Auditoria - Arellano",
  };
}
