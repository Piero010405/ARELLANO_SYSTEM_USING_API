// src/lib/auth/config.ts
export const sessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 día
  },
};

export const sessionOptionsRoute = {
  password: process.env.SECRET_KEY!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24, // 1 día
  },
};

