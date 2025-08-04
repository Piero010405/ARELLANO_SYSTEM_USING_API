import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";

export async function GET(req: NextRequest, { params }: { params: { codigo: string } }) {
  try {
    await requireSession(req);
    const store = await storesService.getStoreById(params.codigo);
    return NextResponse.json(store);
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
