// src/app/api/auth/stores/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);

      // ✅ Leer parámetros de paginación desde la URL
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "10");
    const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0");

    const stores = await storesService.getStores(session.accessToken, pageSize, offset);
    
    return NextResponse.json(stores);
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    return new NextResponse("Error al obtener tiendas", { status: 500 });
  }
}
