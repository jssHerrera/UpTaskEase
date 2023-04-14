import { pool } from '../config/conexion.js'

// ===================================
export const valueUserEmail = async (email) => {
  const [usuario] = await pool.query('SELECT * FROM  usuario where email=?', [email])

  if (usuario.length === 0) {
    return new Error('no se encontro este email registrado')
  }
  return usuario
}

// ===================================
export const getUserByID = async (id) => {
  const [results] = await pool.query('SELECT userID, nombre, email FROM  usuario where userID= ?', [id])

  // Si no hay resultados, rechazamos la promesa con un mensaje de error
  if (results.length === 0) {
    return new Error('No se ha encontrado al usuario')
  }

  return results
}

// =============================================
// Proyectos
// =============================================
export const getProyectoID = async (fechaEntrega) => {
  const [proyecto] = await pool.query('SELECT * FROM proyecto ORDER BY fechaEntrega DESC LIMIT 1 ', [fechaEntrega])

  // Si no hay resultados, rechazamos la promesa con un mensaje de error
  if (proyecto.length === 0) {
    return new Error('No se ha encontrado el proyecto')
  }

  return proyecto
}
