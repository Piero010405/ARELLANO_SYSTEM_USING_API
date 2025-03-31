import sql from "mssql";

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export async function getConnection() {
    try {
      const pool = await sql.connect(dbSettings);
      return pool;
    } catch (err) {
      console.error(err);
    }
  }