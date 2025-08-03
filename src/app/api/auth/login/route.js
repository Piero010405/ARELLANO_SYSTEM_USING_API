import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SECRET_KEY, // Usa una clave segura en .env
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
  },
};

export async function GET(req) {
  const res = NextResponse.json({});
  const session = await getIronSession(req, res, sessionOptions);

  if (!session.user || !session.accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Permitir cookies HTTP-only del backend
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const { accessToken, user } = data;
    const res = NextResponse.json({ success: true, user });
    const session = await getIronSession(req, res, sessionOptions);

    session.accessToken = accessToken; // Guardar accessToken en sesión
    await session.save();

    return res;
  } catch (error) {
    console.error("Error en la API de autenticación: ", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const res = NextResponse.json({ success: true });
  const session = await getIronSession(req, res, sessionOptions);
  await session.destroy();

  return res;
}
