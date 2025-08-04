// src/lib/auth/requireSession.ts
import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { sessionOptionsRoute } from "./config";
import type { SessionData } from "./session";

export async function requireSession(req: NextRequest): Promise<{
  session: SessionData;
  res: NextResponse;
}> {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptionsRoute);

  if (!session || !session.accessToken) {
    throw new Error("UNAUTHORIZED");
  }

  return { session, res };
}
