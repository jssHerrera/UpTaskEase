// import { nombre } from './valid'

// validacion nuevo usuario
export const formValidations = {
  nombre: [
    (value) => value.length >= 3,
    'El nombre es obligatorio'
  ],
  email: [
    (value) => value.includes('@'),
    'El correro debe tener un @'
  ],
  password: [
    (value) => value.length >= 5,
    'El password debe de tener mas de 5 letras'
  ]
}

// =====================================
// VALIDAR CAMPO DE NOMBRE
// =====================================
// ^[a-zA-Z\s.,]+$
const nombre = (text) => {
  const resultado =
  // /^[A-Z][a-zA-Z\s]*\$/.test(text) //
    // /^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/.test(text) &&
    text.length >= 5 && text.trim()

  return resultado
}

// Validacion nuevoProyecto
export const validate = values => {
  const errors = {}
  // validar nombre

  if (!nombre(values.nombre)) {
    errors.nombre = 'complete este campo'
  }

  if (!nombre(values.nombre)) {
    errors.nombre = 'complete este campo'
  }

  // validar descripcion
  if (!nombre(values.descripcion)) {
    errors.descripcion = 'complete este campo'
  }

  // validar fechaEntrega
  if (values.fechaEntrega.length === 0) {
    errors.fechaEntrega = 'complete este campo'
  }

  // validar cliente
  if (!nombre(values.cliente)) {
    errors.cliente = 'complete este campo'
  }

  return errors
}
