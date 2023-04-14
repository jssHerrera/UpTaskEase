import {
  postRegistrarModelo,
  postAutenticarModelo,
  getConfirmarCuentaModelo,
  postOlvidePassworsModelo,
  getComprobarTokenModelo,
  postNuevoPasswordModelo,
  getPerfilModelo
} from '../modelo/Usuario.Modelo.js'
import { pool } from '../../config/conexion.js'
import { generarJWT } from '../../helpers/generarJWT.js'
import { emailRegistro, emailOlvidePAssword } from '../../helpers/email.js'

// Crear nuevo usuario
const registarController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await postRegistrarModelo(req)
    if (result.message) {
      return res.status(400).json({ message: result.message })
    }

    emailRegistro(result)
    connection.release()
    res.json({ message: 'Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta' })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al agregar el usuario' })
  }
}

// ==================================
// Autenticar usuario existe
const autenticarController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await postAutenticarModelo(req)

    if (result.message) {
      return res.status(401).json({ message: result.message })
    }

    connection.release()

    const usuario = result[0]

    res.json({
      message: 'Usuario Confirmado',
      id: usuario.userID,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.userID)
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al confirmar usuario' })
  }
}

// ==================================
// confirmar usuario
const confirmarController = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await getConfirmarCuentaModelo(req)

    if (result.message) {
      return res.status(400).json({ message: result.message })
    }

    connection.release()

    res.status(200).json({
      message: 'Usuario Confirmado Correctamente'
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al confirmar usuario' })
  }
}

// ==================================
// olvidePassword
const olvidePassword = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await postOlvidePassworsModelo(req)

    if (result.message) {
      return res.status(400).json({ message: result.message })
    }

    emailOlvidePAssword(result)

    connection.release()
    res.json({
      message: 'Hemos enviado un email con las instrucciones'
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al solicitar el cambio de nuevo password' })
  }
}

// ==================================
// confirmar usuario
const comprobarToken = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await getComprobarTokenModelo(req)
    if (result.message) {
      return res.status(400).json({ message: result.message })
    }

    connection.release()
    res.json({
      message: 'Good token valido y el usuario existe'
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error el token no es valido' })
  }
}

// ==================================
// nuevo password
const nuevoPassword = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const result = await postNuevoPasswordModelo(req)

    if (result.message) {
      return res.status(400).json({ message: result.message })
    }

    connection.release()
    res.json({
      message: 'Good password modificado correctamente'
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    res.status(422).send({ error: 'Error al crear nuevo password' })
  }
}

// ==================================
// perfil
const perfilController = async (req, res, next) => {
  try {
    const connection = await pool.getConnection()
    const result = await getPerfilModelo(req)

    connection.release()
    res.json({
      message: 'Good perfil',
      result
    })
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error al conectarse a la base de datos' })
    }
    // res.status(422).send({ error: 'Error No se encontromel perfil' })
    const customError = new Error('Error No se encontromel perfil')
    customError.status = 422
    customError.stack = error.stack
    next(customError)
  }
}

export {
  registarController,
  autenticarController,
  confirmarController,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfilController
}
