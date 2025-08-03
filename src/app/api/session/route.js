import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import jwt from "jsonwebtoken";
// import apiClient from "@/utils/axiosInstance"; // Cliente de API con autenticación

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function GET(req) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession(req, res, sessionOptions);

    // 🚨 Verifica si hay un accessToken en la sesión
    const accessToken = session.accessToken;
    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 🔍 Intenta decodificar el accessToken (sin validar firma)
    const decoded = jwt.decode(accessToken);
    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/auth/session:", error);
    return NextResponse.json({ user: null, message: "Error interno" }, { status: 500 });
  }
}