import { clienteAxios } from '../config/clieneteAxios'

// ==============================
// crear nuevo Tarea
// ==============================
export const postNuevaTarea = async (datos = {}, config) => {
  const { data } = await clienteAxios.post('/tareas', datos, config)
  return data
}
// ==============================
// editar Tarea
// ==============================
export const putEditarTarea = async (tareaId = {}, config) => {
  const { nombre, descripcion, fechaEntrega, prioridad, id } = tareaId
  const { data } = await clienteAxios.put(`/tareas/${id}}`, { nombre, descripcion, fechaEntrega, prioridad }, config)
  return data
}
