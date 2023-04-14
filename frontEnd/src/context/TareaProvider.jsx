import { createContext, useCallback, useState } from 'react'
import { getConfig } from '../helpers/getConfigHeaders'
import { useProyectos } from '../hooks/useProyectos'
import { postNuevaTarea, putEditarTarea } from '../services/utaskTraea.api'

const TareaContext = createContext()

export const TareaProvider = ({ children }) => {
  const { proyectoID, setProyectoID } = useProyectos()
  const [modalFormTarea, setModalFormTarea] = useState(false)
  const [modalSinTareas, setModalSinTareas] = useState(false)
  const [modalOpcionTarea, setModalOpcionTarea] = useState(false)
  const [tareaID, setTareaID] = useState({})
  const [tarea, setTarea] = useState({})
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [alerta, setAlerta] = useState({})

  // ============================
  // =============================

  // formulario modal nueva traea
  const handleModal = () => {
    setModalFormTarea(!modalFormTarea)
    setTarea({})
  }

  // ==============================
  // avsiso que no hay tarea
  const onModalSinTareas = useCallback(() => {
    setModalSinTareas(true)
  }, [modalSinTareas])

  // ==============================
  // peticion post para nueva tarea
  const handleNuevaTarea = useCallback((tarea) => {
    const config = getConfig()
    postNuevaTarea(tarea, config)
      .then(elem => {
        const proyectoIDActualizado = { ...proyectoID }
        proyectoIDActualizado.tareas = [...proyectoID.tareas, elem.tarea]
        setProyectoID(proyectoIDActualizado)
        setAlerta({
          msg: elem.message,
          error: false
        })

        setTimeout(() => {
          setAlerta({})
          setModalFormTarea(false)
        }, 2000)
      })
      .catch(error => console.log(error))
  }, [proyectoID.tareas])

  // ==============================
  // peticion editar tarea
  const handleEditarTarea = useCallback((tareaId) => {
    setTarea(tareaId)
    handleModal()
    // const config = getConfig()
    // putEditarTarea(tareaId, config)
    //   .then(elem => console.log(elem))
    //   .catch(error => console.log(error))
  }, [tareaID])

  return (
    <TareaContext.Provider
      value={{
        alerta,
        modalSinTareas,
        modalFormTarea,
        modalOpcionTarea,
        points,
        tarea,
        tareaID,

        // ------------

        setModalSinTareas,
        setModalOpcionTarea,
        setPoints,
        setTarea,
        setTareaID,

        // -------------

        handleNuevaTarea,
        handleModal,
        handleEditarTarea,
        onModalSinTareas
      }}
    >
      {children}
    </TareaContext.Provider>
  )
}

export default TareaContext
