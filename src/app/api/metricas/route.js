// src/app/api/metricas/route.js
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function GET() {
  try {
    const res = await apiClient.get("/metricas"); // <-- Tu API externa
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error al obtener métricas:", error.message);
    return new NextResponse("Error al obtener métricas", { status: 500 });
  }
}
