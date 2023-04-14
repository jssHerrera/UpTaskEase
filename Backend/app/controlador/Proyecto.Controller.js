import { pool } from '../../config/conexion.js'
import {
  obtenerProyectosModelo,
  nuevoProyectoModelo,
  obtenerProyectoModelo,
  editarProyectoModelo,
  eliminarProyectoModelo,
  agregarColaboradorModelo,
  eliminarColaboradorModelo
} from '../modelo/Proyecto.Modelo.js'

// -------------------------------------------
// Obtener proyectos
const obtenerProyectosController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()
    const proyectos = await obtenerProyectosModelo(req)

    if (proyectos.message) {
      return res.status(401).json({ message: proyectos.message })
    }
    connection.release()

    res.json(proyectos)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    // res.status(422).send({ error: 'Error al obtener los proyectos' })
    const customError = new Error('Error al obtener proyectos')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

// -------------------------------------------
// Nuevo proyecto
const nuevoProyectoController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()

    const result = await nuevoProyectoModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }

    connection.release()
    const proyecto = result[0]

    res.json({
      message: 'Proyecto creado',
      proyecto
      // proyecto
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    // res.status(422).send({ error: 'Error al crear proyecto' })
    const customError = new Error('Error al crear proyecto')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

// -------------------------------------------
// Obtener proyecto
const obtenerProyectoController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()
    const result = await obtenerProyectoModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }
    connection.release()
    res.json(result)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    // res.status(422).send({ error: 'Error al obtener proyect' })
    const customError = new Error('Error al obtener proyecto')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

// -------------------------------------------
// Editar Proyecto
const editarProyectoController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()
    const result = await editarProyectoModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }
    connection.release()

    res.json({ result })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    // res.status(422).send({ error: 'Error al editar el proyecto' })
    const customError = new Error('Error al editar el proyecto')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

// -------------------------------------------
// eliminar proyecto
const eliminarProyectoController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await eliminarProyectoModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }
    connection.release()
    res.json({ message: 'Se elimino el proyecto correctamente' })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al eliminar proyecto' })
  }
}

// -------------------------------------------
// Agregar Colaborador
const agregarColaboradorController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await agregarColaboradorModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }
    connection.release()
    res.json({ message: 'Usuario Creado' })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al agregar el usuario' })
  }
}

// -------------------------------------------
// Eliminar Colaborador
const eliminarColaboradorController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await eliminarColaboradorModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }
    connection.release()
    res.json({ message: 'Usuario Creado' })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al agregar el usuario' })
  }
}

export {
  obtenerProyectosController,
  nuevoProyectoController,
  obtenerProyectoController,
  editarProyectoController,
  eliminarProyectoController,
  agregarColaboradorController,
  eliminarColaboradorController
}
