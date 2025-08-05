// src/app/api/auth/stores/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";
import { getPaginationParams } from "@/app/lib/getPaginationParams";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);

    const { pageSize, offset } = getPaginationParams(req);

    const stores = await storesService.getStores(session.accessToken, pageSize, offset);
    
    return NextResponse.json(stores);
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    return new NextResponse("Error al obtener tiendas", { status: 500 });
  }
}
