import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/auth/session";
import { sessionOptions } from "@/lib/auth/config";

export async function GET(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.accessToken) {
    return NextResponse.json({ success: false, message: "No hay sesión activa" }, { status: 401 });
  }
  try {
    const { accessToken } = await authService.refreshToken();
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Error al refrescar token:", error);
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}
