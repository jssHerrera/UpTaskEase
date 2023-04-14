import { clienteAxios } from '../config/clieneteAxios'

export const postRegistrarUsuario = async (datos = {}) => {
  const { nombre, email, password } = datos
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/usuarios`

  const { data } = await clienteAxios.post('/usuarios', { nombre, email, password })
  return data
}

// ===============================================================
export const postOlvidePAssword = async (email = {}) => {
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/usuarios/olvide-password`
  const { data } = await clienteAxios.post('/usuarios/olvide-password', email)
  const message = data.message
  return message
}

// ===============================================================
export const getComprobarToken = async (token) => {
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/usuarios/olvide-password/${token}`
  const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`)
  const message = data.message
  return message
}

// ===============================================================
export const postNuevoPassword = async (token, password = {}) => {
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/usuarios/olvide-password/${token}`
  const data = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
  // const message = data.message
  return data
}

// ===============================================================
export const loginAutenticacion = async (datos) => {
  const { email, password } = datos
  const data = await clienteAxios.post('/usuarios/login', { email, password })
  // const message = data.message
  return data
}

// ===============================================================
export const perilOfUser = async (config) => {
  const data = await clienteAxios('usuarios/perfil', config)
  // const message = data.message

  return data
}
