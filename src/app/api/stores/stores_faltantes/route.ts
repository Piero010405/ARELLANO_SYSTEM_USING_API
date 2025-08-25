// src/app/api/auth/stores/stores_faltantes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);
    const data = await storesService.getStoresFaltantes(session.accessToken);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
    });
  } catch (error) {
    console.error("Error al obtener tiendas faltantes:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
