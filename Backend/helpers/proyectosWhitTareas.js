/* eslint-disable no-prototype-builtins */
export const proyectoWhitTarea = (proyecto, tarea) => {
  return proyecto.map(elem => {
    if (!elem.hasOwnProperty('proyectoID') && tarea.length === 0) {
      return new Error('Error consulte en el DBA')
    }
    const result = tarea.filter(tarea => tarea.proyectoID === elem.proyectoID)
    return {
      ...elem,
      tarea: result
    }
  })
}
