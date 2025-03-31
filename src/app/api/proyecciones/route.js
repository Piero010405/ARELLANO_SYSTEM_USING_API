import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { getConnection } from '@/database/connection';
import sql from 'mssql';


const sessionOptions = {
    password: process.env.SECRET_KEY,
    cookieName: "auth_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };

export async function POST(req) {
  try {
    const res = NextResponse.json({});
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const {
        AS,
        PERIOD,
        SMS_ID,
        STATUS_PROYECTADO,
        RAZON,
        COMENTARIO,
        SE_ANULARA_PROXIMO_PERIODO,
        DETALLE_RAZON,
    } = body;

    if (
        !PERIOD ||
        !AS ||
        !STATUS_PROYECTADO ||
        !RAZON ||
        typeof DETALLE_RAZON !== 'string'
    ) {
      return NextResponse.json({ message: 'Campos obligatorios faltantes o incorrectos.' }, { status: 400 });
    }

    const pool = await getConnection();
    const smsId = String(SMS_ID);

    await pool
        .request()
        .input('PERIOD', sql.VarChar, PERIOD)
        .input('SMS_ID', sql.BigInt, smsId)
        .input('AS', sql.VarChar, AS)
        .input('STATUS_PROYECTADO', sql.VarChar, STATUS_PROYECTADO)
        .input('RAZON', sql.VarChar, RAZON)
        .input('COMENTARIO', sql.VarChar, COMENTARIO || null)
        .input('SE_ANULARA_PROXIMO_PERIODO', sql.VarChar, SE_ANULARA_PROXIMO_PERIODO || null)
        .input('DETALLE_RAZON', sql.VarChar, DETALLE_RAZON)
        .query(`
            INSERT INTO PROYECCIONES
            (PERIOD, SMS_ID, [AS], STATUS_PROYECTADO, RAZON, COMENTARIO, SE_ANULARA_PROXIMO_PERIODO, DETALLE_RAZON)
            VALUES (@PERIOD, @SMS_ID, @AS, @STATUS_PROYECTADO, @RAZON, @COMENTARIO, @SE_ANULARA_PROXIMO_PERIODO, @DETALLE_RAZON)
        `);

    return NextResponse.json({ message: 'Proyección registrada correctamente.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}