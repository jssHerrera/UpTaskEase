import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { pool } from '../../config/conexion.js'
import { valueUserEmail } from '../../helpers/consultasDB.js'

export const postRegistrarModelo = async (req) => {
  const { nombre, password, email } = req.body
  const hash = await bcrypt.hash(password, 10)
  const id = {
    tokenID: uuidv4()
  }

  const [result] = await pool.query('INSERT IGNORE usuario (nombre, password, email, token) VALUES  (?, ?, ?, ?)', [nombre, hash, email, id.tokenID])

  if (result.affectedRows !== 1) {
    return new Error('Usuario ya registrado')
  }

  const [usuario] = await valueUserEmail(email)

  return usuario
}

// =======================================
export const postAutenticarModelo = async (req) => {
  const { email, password } = req.body

  // comprobar si el usuario Existe
  const result = await valueUserEmail(email)
  const usuario = result[0]

  if (result.message) {
    return { message: result.message }
  }
  // comprobar si el usuario esta confirmado
  if (usuario.confirmado === 0) {
    return new Error('Tu cuenta no ha sido confirmada')
  }

  // comprobar el password
  const valuePassword = await bcrypt.compare(password, usuario.password)
  if (!valuePassword) {
    return new Error('El password es incorrecto')
  }

  return result
}

// =======================================
export const getConfirmarCuentaModelo = async (req) => {
  const { token } = req.params

  // comprobar si el usuario Existe
  const [result] = await pool.query('SELECT * FROM  usuario WHERE token=?', [token])

  if (result.length === 0) {
    return new Error('Token invalido')
  }

  const [data] = await pool.query('UPDATE usuario SET token="",  confirmado=1 where nombre=?', [result[0].nombre])

  if (data.affectedRows === 0) {
    return new Error('affectedRows invalid')
  }
  return data
}

// =======================================
export const postOlvidePassworsModelo = async (req) => {
  const { email } = req.body
  const id = {
    tokenID: uuidv4()
  }

  // comprobar si el usuario Existe
  const [result] = await pool.query('SELECT * FROM  usuario where email=?', [email])

  if (result.length === 0) {
    return new Error('El usuario no existe')
  }

  const [data] = await pool.query('UPDATE usuario SET token=?  WHERE nombre=?', [id.tokenID, result[0].nombre])

  if (data.affectedRows === 0) {
    return new Error('affectedRows invalid')
  }

  const [usuario] = await valueUserEmail(email)

  return usuario
}

// =======================================
export const getComprobarTokenModelo = async (req) => {
  const { token } = req.params

  // comprobar si el usuario Existe
  const [result] = await pool.query('SELECT * FROM  usuario where token=?', [token])

  if (result.length === 0) {
    return new Error('Token no valido')
  }

  return result
}

// =======================================
export const postNuevoPasswordModelo = async (req) => {
  const { token } = req.params
  const { password } = req.body
  const hash = await bcrypt.hash(password, 10)

  // comprobar si el usuario Existe
  const [result] = await pool.query('SELECT * FROM  usuario where token=?', [token])
  if (result.length === 0) {
    return new Error('Token no valido')
  }

  await pool.query('UPDATE usuario SET password=?, token=" "  WHERE nombre=?', [hash, result[0].nombre])

  return result
}

export const getPerfilModelo = async (req) => {
  const { usuario } = req
  return usuario
}
