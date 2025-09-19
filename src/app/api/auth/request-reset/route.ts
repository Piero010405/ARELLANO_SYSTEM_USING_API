// src/app/api/auth/login/request-reset.ts
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    const { success, expiresAt } = await authService.requestResetPassword({ email });

    const res = NextResponse.json({ success: true, expiresAt });
    
    return res;
  } catch (error: any) {
    console.error("Request reset error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Error al enviar el correo" },
      { status: 401 }
    );
  }
}
