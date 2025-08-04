// src/lib/auth/config.ts
export const sessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    httpOnly: true,
  },
};

export const sessionOptionsRoute = {
  password: process.env.SECRET_KEY!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Strict",
  },
};

