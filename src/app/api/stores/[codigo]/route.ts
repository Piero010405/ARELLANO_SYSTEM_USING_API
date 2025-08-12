// src/app/api/auth/stores/[codigo]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";

export async function GET(req: NextRequest, { params }: { params: { codigo: string } }) {
  try {
    const { codigo } = params
    const { session } = await requireSession(req);
    const store = await storesService.getStoreById(codigo, session.accessToken);
    return NextResponse.json(store);
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}