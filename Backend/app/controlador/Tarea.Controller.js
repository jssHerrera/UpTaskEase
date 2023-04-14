import { pool } from '../../config/conexion.js'
import {
  agregarTareaModelo,
  obtenerTareaModelo,
  actualizarTareaModelo,
  eliminarTareaModelo,
  cambiarEstadoModelo
} from '../modelo/Tarea.Modelo.js'

// -------------------------------------------
// Agregar tarea
const agregarTareaController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()
    const proyectos = await agregarTareaModelo(req)

    if (proyectos.message) {
      return res.status(401).json({ message: proyectos.message })
    }

    connection.release()
    const tarea = proyectos[0]
    res.json({
      message: 'tarea creada',
      tarea
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    const customError = new Error('Error al crear tarea')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

// -------------------------------------------
// Optener tarea
const obtenerTareaController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const proyectos = await obtenerTareaModelo(req)

    if (proyectos[0].message) {
      return res.status(400).json({ message: proyectos[0].message })
    }
    connection.release()
    res.json(proyectos)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al obtener tarea' })
  }
}

// -------------------------------------------
// Actualizar Tarea
const actualizarTareaController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const tarea = await actualizarTareaModelo(req)

    if (tarea.message) {
      return res.status(400).json({ message: tarea.message })
    }
    connection.release()
    res.json(tarea)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al actualizar tarea' })
  }
}

// -------------------------------------------
// Eliminar Tarea
const eliminarTareaController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const proyectos = await eliminarTareaModelo(req)

    if (proyectos.message) {
      return res.status(400).json({ message: proyectos.message })
    }
    connection.release()
    res.json({ message: 'se elimino la tarea correctamente' })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al eliminar tarea' })
  }
}

// -------------------------------------------
// Actualizar Tarea
const cambiarEstadoController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const proyectos = await cambiarEstadoModelo(req)

    if (proyectos.message) {
      return res.status(400).json({ message: proyectos.message })
    }
    connection.release()
    res.json(proyectos)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al actualizar tarea' })
  }
}

export {
  agregarTareaController,
  obtenerTareaController,
  actualizarTareaController,
  eliminarTareaController,
  cambiarEstadoController
}
