import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import apiClient from "@/utils/axiosInstance"; // Cliente con autenticación y refresh token

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function POST(req) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession({ request: req, response: res, sessionOptions });

    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();

    // 🚀 Llamada a la API del backend
    const response = await apiClient.post("/api/proyecciones", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error en POST /api/proyecciones:", error);
    return NextResponse.json({ message: error.response?.data?.message || "Error interno" }, { status: error.response?.status || 500 });
  }
}
