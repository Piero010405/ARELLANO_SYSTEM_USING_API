import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/config";
import type { SessionData } from "@/lib/auth/session";
import { authService } from "@/services";

export async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions);

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  if (!session.user || !session.accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const result = await authService.validateSession(session.accessToken);
  if (!result?.user) {
    // * Invalidar la sesión local
    session.destroy?.();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protegemos toda la ruta dashboard
};
