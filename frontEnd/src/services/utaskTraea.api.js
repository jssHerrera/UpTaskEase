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
  const { nombre, descripcion, prioridad, fechaEntrega, tareaID } = tareaId

  const { data } = await clienteAxios.put(`/tareas/${tareaID}`, { nombre, descripcion, prioridad, fechaEntrega, tareaID }, config)
  return data
}

// ==============================
// editar Tarea
// ==============================
export const deleteTarea = async (tareaId = {}, config) => {
  const { data } = await clienteAxios.delete(`/tareas/${tareaId}`, config)
  return data
}
