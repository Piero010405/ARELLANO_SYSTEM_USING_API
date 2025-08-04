// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/config";
import { authService } from "@/services";
import type { SessionData } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.accessToken) {
    return NextResponse.json({ success: false, message: "No hay sesión activa" }, { status: 401 });
  }

  try {
    await authService.logout(); // Hace POST a /api/auth/logout (backend)
    await session.destroy();
    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Error cerrando sesión" }, { status: 500 });
  }
}
