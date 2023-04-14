import { pool } from '../config/conexion.js'

export const valueProyectoUser = async (id, userID, menssage) => {
  const [result] = await pool.query('select * from proyecto WHERE proyectoID = ?', [id])

  if (result.length === 0) {
    return new Error(' Proyecto no encontrado ')
  }

  if (result[0].creadorID !== userID) {
    return new Error(menssage || 'Accion no validad ')
  }
  return result
}
