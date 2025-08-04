// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { authService } from "@/services";
import { sessionOptions } from "@/lib/auth/config";
import type { SessionData } from "@/lib/auth/session";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    const { accessToken, user } = await authService.login({ email, password });

    const res = NextResponse.json({ success: true, user });
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    // ⚠️ BORRA lo que exista antes
    await session.destroy();

    // ⚠️ Luego reestablece la sesión
    session.accessToken = accessToken;
    session.user = user;
    await session.save();
    
    return res;
  } catch (error: any) {
    console.error("Login error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }
}
