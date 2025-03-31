import { NextResponse } from "next/server";
import { getConnection } from "@/database/connection";
import { getIronSession } from "iron-session";
import sql from 'mssql';

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

        let query = `
            SELECT
                SUM(CASE WHEN OOEE_A_REPORTAR = 'NOTAUDITED' THEN 1 ELSE 0 END) AS notaudited,
                SUM(CASE WHEN OOEE_A_REPORTAR = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled,
                SUM(CASE WHEN DT_A_REPORTAR = 'FUERA DE DT' THEN 1 ELSE 0 END) AS fueraDT,
                SUM(CASE WHEN OOEE_A_REPORTAR = 'FULLAUDIT' THEN 1 ELSE 0 END) AS fullAudit,
                SUM(CASE WHEN RAZON_OOEE = 'SIN RAZÓN REGISTRADA POR AS' OR RAZON_DT = 'SIN RAZÓN REGISTRADA POR AS' THEN 1 ELSE 0 END) AS tiendasFaltantes
            FROM dbo.INDICADORES_DEP
            WHERE period = (SELECT E2E_ID FROM NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1)
        `;

        const params = [];

        if (session.user.admin !== true) {
            query += ` AND [AS] = @nombreUsuario`;
            params.push({ name: 'nombreUsuario', type: sql.VarChar, value: nombreUsuario });
        }

        const result = await pool.request()
            .input('nombreUsuario', sql.VarChar, nombreUsuario)
            .query(query);

        const { notaudited, cancelled, fueraDT, fullAudit, tiendasFaltantes } = result.recordset[0];
        const totalTiendas = notaudited + cancelled + fueraDT;

        return NextResponse.json({
        notaudited,
        cancelled,
        fueraDT,
        fullAudit,
        tiendasFaltantes,
        totalTiendas,
        });
  } catch (err) {
    console.error("Error al obtener métricas:", err);
    return NextResponse.json({ error: "Error al obtener métricas" }, { status: 500 });
  }
}
