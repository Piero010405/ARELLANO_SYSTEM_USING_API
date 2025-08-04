// src/app/api/auth/stores/stores_proyectadas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    await requireSession(req);
    const data = await storesService.getStoresProyectadas();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al obtener tiendas proyectadas:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
