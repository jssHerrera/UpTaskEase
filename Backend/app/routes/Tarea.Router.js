import { Router } from 'express'
import { checkAuth } from '../middelware/checkAuth.js'
import {
  agregarTareaController,
  obtenerTareaController,
  actualizarTareaController,
  eliminarTareaController,
  cambiarEstadoController
} from '../controlador/Tarea.Controller.js'
const router = Router()

// http://localhost:3000/api/v1/tareas
router.post('/', checkAuth, agregarTareaController)

// http://localhost:3000/api/v1/tareas/1
router
  .route('/:id')
  .get(checkAuth, obtenerTareaController)
  .put(checkAuth, actualizarTareaController)
  .delete(checkAuth, eliminarTareaController)

// http://localhost:3000/api/v1/tareas/estado/1
router.post('/estado/:id', checkAuth, cambiarEstadoController)
export default router
