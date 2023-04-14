import { Router } from 'express'
import {
  obtenerProyectosController,
  nuevoProyectoController,
  obtenerProyectoController,
  editarProyectoController,
  eliminarProyectoController,
  // buscarColaboradorController,
  agregarColaboradorController,
  eliminarColaboradorController
} from '../controlador/Proyecto.Controller.js'
import { checkAuth } from '../middelware/checkAuth.js'
const router = Router()

// http://localhost:3000/api/v1/proyectos
router
  .route('/')
  .get(checkAuth, obtenerProyectosController)
  .post(checkAuth, nuevoProyectoController)

// http://localhost:3000/api/v1/proyectos/1
router
  .route('/:id')
  .get(checkAuth, obtenerProyectoController)
  .put(checkAuth, editarProyectoController)
  .delete(checkAuth, eliminarProyectoController)

// router.post('/colaboradores', checkAuth, buscarColaboradorController)
router.post('/colaboradores/:id', checkAuth, agregarColaboradorController)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaboradorController)

export default router
