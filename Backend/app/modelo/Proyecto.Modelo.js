import { pool } from '../../config/conexion.js'
import { valueProyectoUser } from '../../helpers/valueProyectoUser.js'

export const obtenerProyectosModelo = async (req) => {
  const { userID, nombre } = req.usuario
  const [result] = await pool.query('select * from proyecto WHERE creadorID = ?', [userID])

  if (result.length === 0) {
    return new Error('el usuario no tiene poryectos creado')
  }

  const newArray = result.map(obj => {
    return { ...obj, responsable: nombre }
  })

  return newArray
}

// -------------------------------------------
export const nuevoProyectoModelo = async (req) => {
  const { nombre, descripcion, fechaEntrega, cliente } = req.body
  const { userID } = req.usuario

  const [result] = await pool.query('INSERT IGNORE proyecto (nombre, descripcion, fechaEntrega, cliente, creadorID) VALUES  (?, ?, ?, ?, ?) ', [nombre, descripcion, fechaEntrega, cliente, userID])

  if (result.affectedRows !== 1) {
    return new Error('No se pudo crear el proyecto, intente nuevamente')
  }

  const [proyecto] = await pool.query('SELECT * FROM proyecto ORDER BY fechaCreacion DESC LIMIT 1')

  return proyecto
}

// -------------------------------------------
export const obtenerProyectoModelo = async (req) => {
  const { id } = req.params
  const { userID } = req.usuario

  const proyecto = await valueProyectoUser(id, userID)
  if (proyecto.length === undefined) {
    return proyecto
  }

  const proyectoID = proyecto[0]

  const [tareas] = await pool.query('SELECT * FROM tarea WHERE proyectoID = ? ', [id])

  proyectoID.tareas = tareas.length === 0 ? [] : tareas

  return proyectoID
}

// -------------------------------------------
export const editarProyectoModelo = async (req) => {
  const { id } = req.params
  const { userID } = req.usuario

  const result = await valueProyectoUser(id, userID)
  if (result.length === undefined) {
    return result
  }

  const [data] = await pool.query('UPDATE proyecto SET ? WHERE proyectoID=?', [req.body, id])

  if (data.affectedRows === 0) {
    return new Error(`Error UPDATE for proyect: ${id}`)
  }

  const [proyecto] = await pool.query('select * from proyecto  WHERE proyectoID=?', [id])
  const proyectoActualizado = proyecto[0]
  return proyectoActualizado
}

// -------------------------------------------
export const eliminarProyectoModelo = async (req) => {
  const { id } = req.params
  const { userID } = req.usuario

  const result = await valueProyectoUser(id, userID)
  if (result.length === undefined) {
    return result
  }

  const [data] = await pool.query('DELETE FROM proyecto WHERE proyectoID=?', [id])
  if (data.affectedRows === 0) {
    return new Error(`Error DELETE for proyect: ${id}`)
  }
  return result
}

// -------------------------------------------
export const agregarColaboradorModelo = async (req) => {
  console.log('holi')
}

// -------------------------------------------
export const eliminarColaboradorModelo = async (req) => {
  console.log('holi')
}
