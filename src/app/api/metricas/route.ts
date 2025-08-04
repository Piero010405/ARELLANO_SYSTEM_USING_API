// src/app/api/metricas/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosBackend from "@/lib/api/client";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/auth/session";
import { sessionOptionsRoute } from "@/lib/auth/config";


export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptionsRoute);

  if (!session.accessToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const response = await axiosBackend.get("/api/metricas", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error al obtener métricas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
