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
    // Obtener sesión
    const res = NextResponse.json({});
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const nombreUsuario = session.user.name;

    // Conexión a SQL Server
    const pool = await getConnection();
    let query = `
      SELECT 
        PERIOD, CODIGO, AMP, [AS], NOMBRE_AUDITOR, CLUSTER, TERRITORIO, PROVINCIA, DISTRITO, 
        CANAL, UBICACION, STATUS_ACTUAL_EFECTIVO_E2E, STATUS_PROYECTADO, OOEE_A_REPORTAR, 
        RAZON_OOEE, COMENTARIO_OOEE, FECHA_DE_VISITA_PERIODO_ANTERIOR_E2E, 
        FECHA_DE_VISITA_AJUSTADA_CALC, DIAS_TRANSCURRIDOS_EFECTIVOS, 
        DT_PROYECTADO, DT_A_REPORTAR, RAZON_DT, COMENTARIO_DT
      FROM dbo.INDICADORES_DEP 
      WHERE PERIOD = (SELECT E2E_ID FROM dbo.NIELSSEN_CURRENT_PERIOD WHERE IS_CURRENT = 1)
      AND ((STATUS_ACTUAL_EFECTIVO_E2E = 'UNKNOWN' AND STATUS_PROYECTADO IN ('NOTAUDITED', 'CANCELLED')) OR ([FUERA_DE_DT?_LIM_INF] = 'REGULAR' AND [FUERA_DE_DT?_LIM_SUP] = 'REGULAR' AND DT_PROYECTADO = 'FUERA DE DT'))
    `;

    if (session.user.admin !== true) {
      query += ` AND [AS] = @nombreUsuario`;
    }

    const result = await pool.request()
      .input("nombreUsuario", nombreUsuario)
      .query(query);

    return NextResponse.json(result.recordset, { status: 200 });

  } catch (error) {
    console.error("Error en la API de stores:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
