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
    const accessToken = session.accessToken;

    // ✅ Extraer refreshToken desde las cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(cookieHeader.split(";").map(cookie => {
      const [key, ...val] = cookie.trim().split("=");
      return [key, val.join("=")];
    }));
    const refreshToken = cookies["refreshToken"];
    
    // ✅ Enviar accessToken y refreshToken como headers personalizados
    if (accessToken && refreshToken) {
      await authService.logout(accessToken, refreshToken);
    }

    await session.destroy();
    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Error cerrando sesión" }, { status: 500 });
  }
}
