import { pool } from '../../config/conexion.js'

export const getPingModelo = async () => {
  const result = await pool.query('select 1 + 1  as result ')
  console.log(result)
}
