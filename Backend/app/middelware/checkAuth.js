import jwt from 'jsonwebtoken'
import { getUserByID } from '../../helpers/consultasDB.js'

export const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .json({ message: 'Tu petición no tiene cabecera de autorización' })
    }

    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const [result] = await getUserByID(decode.id)

    if (result.message) {
      return res.status(404).json({ message: result.message })
    }
    // connection.release()
    req.usuario = result
    next()
  } catch (error) {
    // res.status(401).send({ error: 'Token no valido' })
    const customError = new Error('Error Token no valido')
    customError.status = 401
    customError.stack = error.stack
    next(customError)
  }
}
