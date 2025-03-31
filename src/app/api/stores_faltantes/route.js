import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import apiClient from "@/utils/axiosInstance";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function GET(req) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession({ request: req, response: res, sessionOptions });
    
    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    
    const response = await apiClient.get("/api/stores/stores-faltantes");

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Error obteniendo las tiendas faltantes:", err);
    return NextResponse.json({ error: "Error al obtener las tiendas faltantes" }, { status: 500 });
  }
}