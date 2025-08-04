// src/app/api/auth/sotores/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    await requireSession(req);
    const stores = await storesService.getStores();
    return NextResponse.json(stores);
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    return new NextResponse("Error al obtener tiendas", { status: 500 });
  }
}
