// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosBackend from "@/lib/api/client";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/auth/session";
import { sessionOptionsRoute } from "@/lib/auth/config";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true, message: "Sesión cerrada" });
  const session = await getIronSession<SessionData>(req, res, sessionOptionsRoute);

  if (!session.accessToken) {
    return NextResponse.json(
      { success: false, message: "No hay sesión activa" },
      { status: 401 }
    );
  }
  
  try {
    await axiosBackend.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    await session.destroy();
    return res;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return NextResponse.json(
      { success: false, message: "Error cerrando sesión" },
      { status: 500 }
    );
  }
}
