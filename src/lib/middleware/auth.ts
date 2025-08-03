// src/lib/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function authMiddleware(req: NextRequest) {
  const session = await getSession(req);
  if (!session.user || !session.accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
