import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function GET(req) {
  const res = NextResponse.json({});
  const session = await getIronSession(req, res, sessionOptions);

  if (!session.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
}