//src/app/api/session/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(req: Request) {
  try {
    const session = await getSession(req as any);
    if (!session.user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la sesión:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
