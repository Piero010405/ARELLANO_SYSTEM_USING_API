// src/app/api/auth/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosBackend from "@/lib/api/client";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/auth/session";
import { sessionOptionsRoute } from "@/lib/auth/config";


export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptionsRoute);

  if (!session.accessToken) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  try {
    const response = await axiosBackend.get("/api/auth/validate", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json({
      valid: true,
      user: response.data.user,
    });
  } catch (error) {
    console.error("Error al validar sesión:", error);
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
