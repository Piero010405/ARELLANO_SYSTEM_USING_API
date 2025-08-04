// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosBackend from "@/lib/api/client";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/auth/session";

const sessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await axiosBackend.post("/api/auth/login", {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    const res = NextResponse.json({ success: true, user });
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
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
