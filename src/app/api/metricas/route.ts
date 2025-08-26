// src/app/api/auth/metricas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { metricasService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);
    const data = await metricasService.getMetrics(session.accessToken);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error al obtener métricas:", error);
    return new NextResponse("Error al obtener métricas", { status: 500 });
  }
}