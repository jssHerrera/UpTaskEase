import { Router } from 'express'
import {
  registarController,
  autenticarController,
  confirmarController,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfilController
} from '../controlador/Usuario.Controller.js'
import { checkAuth } from '../middelware/checkAuth.js'
const router = Router()

// Autenticacion, Registro y Confirmacion de Usuario
// http://localhost:3000/api/v1/usuarios
router.post('/', registarController)

// http://localhost:3000/api/v1/usuarios/login
router.post('/login', autenticarController)

// http://localhost:3000/api/v1/usuarios/confirmar/:token
router.get('/confirmar/:token', confirmarController)

// http://localhost:3000/api/v1/usuarios/olvide-password
router.post('/olvide-password', olvidePassword)

// http://localhost:3000/api/v1/usuarios/olvide-password/:token
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

// http://localhost:3000/api/v1/usuarios/perfil
router.get('/perfil', checkAuth, perfilController)

export default router
