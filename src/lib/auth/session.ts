// src/lib/auth/session.ts
import { getIronSession } from "iron-session";
import { sessionOptions } from "./config";
import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/lib/types/auth";

export interface SessionData {
  accessToken?: string;
  user?: User;
}

export async function getSession(req: NextRequest): Promise<SessionData> {
  const res = new NextResponse();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return session;
}

export async function saveSession(
  req: NextRequest,
  res: NextResponse,
  data: SessionData
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  Object.assign(session, data);
  await session.save();
}

export async function destroySession(req: NextRequest, res: NextResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  await session.destroy();
}
