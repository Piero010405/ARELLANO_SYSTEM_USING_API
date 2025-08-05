// lib/utils/getPaginationParams.ts
import { NextRequest } from "next/server";
export function getPaginationParams(req: NextRequest) {
    // Leer parámetros de paginación desde la URL
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "10");
    const offset = (page - 1) * pageSize;

    return { pageSize, offset };
}
