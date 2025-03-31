import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Strict",
  },
};

export async function POST(req) {
  try {
    const res = NextResponse.json({ success: true, message: "Sesión cerrada" }, { status: 200 });
    const session = await getIronSession({ request: req, response: res, sessionOptions });

    if (!session.accessToken) {
      return NextResponse.json({ success: false, message: "No hay sesión activa" }, { status: 401 });
    }

    // Enviar la solicitud de logout a la API backend
    const response = await fetch(`${process.env.API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // Para enviar cookies (refreshToken)
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, message: "Error cerrando sesión" }, { status: 500 });
    }

    // Destruir la sesión en Next.js (eliminar el accessToken de la sesión)
    session.destroy();

    return res;
  } catch (error) {
    console.error("Error en logout:", error);
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
