import { getIronSession } from "iron-session/edge";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function middleware(req) {
  const res = new Response();
  const session = await getIronSession({ request: req, response: res, sessionOptions });

  if (!session.user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protege el dashboard
};