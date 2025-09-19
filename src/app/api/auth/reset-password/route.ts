// src/app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    const result = await authService.resetPassword({ token, newPassword });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Reset password error:", error?.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message: error?.response?.data?.message || "Error al restablecer la contraseña.",
        errors: error?.response?.data?.errors || [],
      },
      { status: error?.response?.status || 500 }
    );
  }
}
