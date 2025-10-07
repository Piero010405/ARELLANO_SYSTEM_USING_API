// src/app/api/last-update/e2e/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { lastUpdateService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);
    const data = await lastUpdateService.getLastUpdateE2e(session.accessToken);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error al obtener la última fecha de actualización del E2E:", error);
    return new NextResponse("Error al obtener la última fecha de actualización del E2E", { status: 500 });
  }
}