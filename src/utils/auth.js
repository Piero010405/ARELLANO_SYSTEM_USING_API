import sql from "mssql";
import bcrypt from 'bcrypt';
import { getConnection } from "@/database/connection";

export async function verifyUser(email, password) {
  const pool = await getConnection();

  const result = await pool.request()
    .input("email", sql.NVarChar(255), email)
    .query("SELECT * FROM [dbo].[AS] WHERE EMAIL = @email");

  if (result.recordset.length === 0) {
    return null;
  }

  const user = result.recordset[0];

   // Comparar la contraseña ingresada con el hash almacenado usando bcrypt
   const passwordMatch = await bcrypt.compare(password, user.PASSWORD);

   if (!passwordMatch) {
     console.log("Contraseña Incorrecta");
     return null;
   }

  return { id: user.SUPERVISOR_ID, email: user.EMAIL, name: user.NOMBRE, photo: user.FOTO, admin: user.ADMIN };
}
