// =====================================
// VALIDAR CAMPOS
// =====================================
// ^[a-zA-Z\s.,]+$
const nombre = (text) => {
  const resultado = text.length >= 3 && text.trim()

  return resultado
}

// Validacion nuevoProyecto
export const validate = values => {
  const errors = {}
  // validar nombre

  if (!nombre(values.nombre)) {
    errors.nombre = 'complete este campo'
  }

  // validar descripcion
  if (!nombre(values.descripcion)) {
    errors.descripcion = 'complete este campo'
  }

  // validar descripcion
  if (!nombre(values.prioridad)) {
    errors.prioridad = 'complete este campo'
  }

  // validar fechaEntrega
  if (values.fechaEntrega.length === 0) {
    errors.fechaEntrega = 'complete este campo'
  }

  return errors
}
