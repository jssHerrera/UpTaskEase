export const formateFecha2 = (fecha) => {
  const nuevaFecha = new Date(fecha)

  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    //   month: '2-digit',
  //   day: '2-digit',
  //   year: 'numeric'
  }

  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

export const formateFecha = (fecha) => {
  const fechaObj = new Date(fecha)
  const mes = fechaObj.toLocaleString('default', { month: 'short' })
  const dia = fechaObj.getDate()
  return `${mes} ${dia}`
}
