import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import apiClient from "@/utils/axiosInstance"; // Middleware con refresh automático

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function GET() {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession({ request: req, response: res, sessionOptions });
    
    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    
    // 🚀 Llamada a la API del backend (con autenticación y refresh token automático)
    const response = await apiClient.get("/api/metricas");

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Error obteniendo métricas:", err);
    return NextResponse.json({ error: "Error al obtener métricas" }, { status: 500 });
  }
}