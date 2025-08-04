// src/app/api/auth/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/requireSession";
import { authService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { session } = await requireSession(req);
    const result = await authService.validateSession(session.accessToken);
    if (!result?.user) {
      return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
    }

    return NextResponse.json({ user: result.user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}
