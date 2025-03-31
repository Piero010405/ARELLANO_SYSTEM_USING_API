import { NextResponse } from "next/server";
import { getConnection } from "@/database/connection";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function GET(req) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const nombreUsuario = session.user.name;
    const pool = await getConnection();

    // Obtener la paginación desde la URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const offset = (page - 1) * pageSize;

    const query = (session.user.admin == 1) ?
    `
      SELECT 
          ID.*, 
          MUE.NOMBRE AS NOMBRE_TIENDA, 
          MUE.[MES CONTRATO] AS MES_CONTRATO 
      FROM INDICADORES_DEP ID
      LEFT JOIN dbo.MUESTRA MUE 
          ON MUE.CODIGO = ID.CODIGO
      WHERE 
          ID.PERIOD = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1)
      ORDER BY ID.CODIGO
      OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
    `:
    `
      SELECT 
          ID.*, 
          MUE.NOMBRE AS NOMBRE_TIENDA, 
          MUE.[MES CONTRATO] AS MES_CONTRATO 
      FROM INDICADORES_DEP ID
      LEFT JOIN dbo.MUESTRA MUE 
          ON MUE.CODIGO = ID.CODIGO
      WHERE 
          ID.PERIOD = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1)
          AND ID.[AS] = @nombreUsuario
      ORDER BY ID.CODIGO
      OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
    `
    ;

    const totalQuery = (session.user.admin == 1) ?
    `
      SELECT COUNT(*) as total 
      FROM INDICADORES_DEP 
      WHERE PERIOD = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1) 
    ` : 
    `
      SELECT COUNT(*) as total 
      FROM INDICADORES_DEP 
      WHERE PERIOD = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1) 
      AND [AS] = @nombreUsuario
    `
    ;

    const result = await pool.request()
      .input("nombreUsuario", nombreUsuario)
      .input("offset", offset)
      .input("pageSize", pageSize)
      .query(query);

    const totalResult = await pool.request()
      .input("nombreUsuario", nombreUsuario)
      .query(totalQuery);

    return NextResponse.json({
      stores: result.recordset || [],
      total: totalResult.recordset[0]?.total || 0
    }, { status: 200 });

  } catch (error) {
    console.error("Error en la API de stores:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}