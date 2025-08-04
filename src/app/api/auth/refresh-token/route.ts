// src/app/api/auth/refresh-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosBackend from "@/lib/api/client";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/auth/session";
import { sessionOptionsRoute } from "@/lib/auth/config";

export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptionsRoute);

  try {
    const response = await axiosBackend.get("/api/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      withCredentials: true,
    });

    const { accessToken } = response.data;
    session.accessToken = accessToken;
    await session.save();

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Error al actualizar el token:", error);
    await session.destroy();
    return NextResponse.json({ error: "Sesión expirada" }, { status: 401 });
  }
}
