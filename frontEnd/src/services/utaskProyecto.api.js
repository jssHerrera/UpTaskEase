import { clienteAxios } from '../config/clieneteAxios'

// ==============================
// crear nuevo proyecto
// ==============================
export const postNuevoProyecto = async (datos = {}, config) => {
  const { data } = await clienteAxios.post('/proyectos', datos, config)
  return data
}

// ==============================
// consultar proyectos creados
// ==============================
export const getProyectos = async (config) => {
  const { data } = await clienteAxios.get('/proyectos', config)
  return data
}

// ==============================
// consultar proyectoID
// ==============================
export const getProyectoID = async (proyectoID, config) => {
  const { data } = await clienteAxios.get(`/proyectos/${proyectoID}`, config)
  return data
}

// ==============================
// editar proyecto
// ==============================
export const putEditandoProyecto = async (proyectoID, config) => {
  const { nombre, descripcion, fechaEntrega, cliente, id } = proyectoID

  const { data } = await clienteAxios.put(`/proyectos/${id}`, { nombre, descripcion, fechaEntrega, cliente }, config)

  return data
}

// ==============================
// eliminar Proyecto
// ==============================
export const deleteProyecto = async (proyectoID, config) => {
  const { data } = await clienteAxios.delete(`/proyectos/${proyectoID}`, config)

  return data
}
