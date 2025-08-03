import { NextResponse } from "next/server";
import api from "@/utils/apiServer"; // Conexión a tu API externa

export async function GET() {
  try {
    const response = await api.post("/refresh-token", {}, { withCredentials: true });

    if (!response.data.success) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
    }

    const { accessToken } = response.data;

    return NextResponse.json({ accessToken });
  } catch (err) {
    console.error("Error refreshing token:", err);
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  }
}