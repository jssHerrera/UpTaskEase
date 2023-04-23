import { pool } from '../../config/conexion.js'
import { valueProyectoUser } from '../../helpers/valueProyectoUser.js'
import { proyectoWhitTarea } from '../../helpers/proyectosWhitTareas.js'

export const agregarTareaModelo = async (req) => {
  const { nombre, descripcion, estado, fechaEntrega, prioridad, proyectoID } = req.body

  const { userID } = req.usuario

  const message = 'No tienes permisos para añadir tareas'

  const result = await valueProyectoUser(proyectoID, userID, message)
  if (result.length === undefined) {
    return result
  }

  const [tareaAdd] = await pool.query('INSERT INTO tarea(nombre, descripcion, estado, fechaEntrega, prioridad, proyectoID) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, estado, fechaEntrega, prioridad, proyectoID])

  if (tareaAdd.affectedRows !== 1) {
    return new Error('No se pudo crear el proyecto, intente nuevamente')
  }

  const [tarea] = await pool.query('SELECT * FROM tarea ORDER BY fechaCreacion DESC LIMIT 1')
  return tarea
}

// -------------------------------------------
export const obtenerTareaModelo = async (req) => {
  const { id } = req.params
  const { userID } = req.usuario

  const [tarea] = await pool.query('SELECT * FROM tarea WHERE tareaID = ?', [id])
  const proyectoID = tarea[0].proyectoID

  const proyecto = await valueProyectoUser(proyectoID, userID)
  if (proyecto.length === undefined) {
    return proyecto
  }

  const result = proyectoWhitTarea(proyecto, tarea)

  return result
}

// -------------------------------------------
export const actualizarTareaModelo = async (req) => {
  const { userID } = req.usuario
  const { tareaID } = req.body

  const [tarea] = await pool.query('SELECT * FROM tarea WHERE tareaID = ?', [tareaID])
  const proyectoID = tarea[0].proyectoID

  const result = await valueProyectoUser(proyectoID, userID)
  if (result.length === undefined) {
    return result
  }

  const [data] = await pool.query('UPDATE tarea SET ? WHERE tareaID = ?', [req.body, tarea[0].tareaID])

  if (data.affectedRows === 0) {
    return new Error(`Error UPDATE for tarea: ${tareaID}`)
  }

  const [tareaActualizada] = await pool.query('SELECT * FROM tarea WHERE tareaID = ?', [tareaID])

  return tareaActualizada
}

// -------------------------------------------
export const eliminarTareaModelo = async (req) => {
  const { userID } = req.usuario
  const { id } = req.params
  const menssage = 'tarea no encontrada'

  const [tarea] = await pool.query('SELECT * FROM tarea WHERE tareaID = ?', [id])
  const proyectoID = tarea[0].proyectoID
  const result = await valueProyectoUser(proyectoID, userID, menssage)
  if (result.length === undefined) {
    return result
  }

  const data = await pool.query('DELETE FROM tarea WHERE tareaID = ?', [tarea[0].tareaID])
  if (data[0].affectedRows === 0) {
    return new Error(`Error DELETE for tarea: ${id}`)
  }

  return data
}

// -------------------------------------------
export const cambiarEstadoModelo = (req) => {
  console.log('holi')
}
