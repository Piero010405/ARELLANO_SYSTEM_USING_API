// src/app/api/auth/proyecciones/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { proyeccionesService } from "@/services";

export async function POST(req: NextRequest) {
  try {
    const { session } = await requireSession(req);
    const body = await req.json();
    const result = await proyeccionesService.postProyeccion(body, session.accessToken);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al registrar proyección:", error);
    return new NextResponse("Error al registrar proyección", { status: 500 });
  }
}
