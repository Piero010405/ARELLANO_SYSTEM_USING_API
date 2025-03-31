import { NextResponse } from "next/server";
import { getConnection } from "@/database/connection";
import { getIronSession } from "iron-session";
import sql from 'mssql';

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "auth_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function GET(req, { params }) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const storeId = params.codigo; //
    if (!storeId) {
      return NextResponse.json({ error: "Código de tienda requerido" }, { status: 400 });
    }

    const pool = await getConnection();

    let query = `
      SELECT TOP 1 ID.*, MUE.NOMBRE AS NOMBRE_TIENDA, MUE.[MES CONTRATO] AS MES_CONTRATO FROM INDICADORES_DEP ID
      LEFT JOIN dbo.MUESTRA MUE ON MUE.CODIGO = ID.CODIGO
      WHERE ID.CODIGO = @storeId
      AND ID.PERIOD = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1)
    `;
    
    if (session.user.admin !== true) {
      query += ` AND ID.[AS] = @nombreUsuario`;
    }
    
    const result = await pool.request()
      .input("storeId", storeId)
      .input("nombreUsuario", sql.VarChar, session.user.name)
      .query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: "Tienda no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0], { status: 200 });
  } catch (error) {
    console.error("Error en la API de búsqueda por tienda:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}