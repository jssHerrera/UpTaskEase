import { createContext, useCallback, useState } from 'react'
import { getConfig } from '../helpers/getConfigHeaders'
import { useProyectos } from '../hooks/useProyectos'
import { deleteTarea, postNuevaTarea, putEditarTarea } from '../services/utaskTraea.api'

const TareaContext = createContext()

export const TareaProvider = ({ children }) => {
  const { proyectoID, setProyectoID } = useProyectos([])
  const [modalFormTarea, setModalFormTarea] = useState(false)
  const [modalSinTareas, setModalSinTareas] = useState(false)
  const [dropTarea, setDropTarea] = useState(false)
  const [tareaID, setTareaID] = useState({})
  const [alerta, setAlerta] = useState({})
  // ============================
  // =============================
  // formulario modal nueva traea
  const handleModal = () => {
    setModalFormTarea(!modalFormTarea)
    setTareaID({})
    setDropTarea(false)
  }

  // ==============================
  // modal no hay tarea
  const onModalSinTareas = useCallback(() => {
    setModalSinTareas(true)
  }, [modalSinTareas])

  // =========================
  // crea nueva tarea
  // =========================
  const submitTarea = (tarea) => {
    if (tarea.tareaID === '') {
      handleNuevaTarea(tarea)
    } else {
      handleEditarTarea(tarea)
    }
  }

  // ==============================
  // peticion post para nueva tarea
  const handleNuevaTarea = useCallback(tarea => {
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
  const handleEditarTarea = (tareaId) => {
    const config = getConfig()
    putEditarTarea(tareaId, config)
      .then(elem => {
        const tareaActualizado = { ...proyectoID }
        tareaActualizado.tareas = tareaActualizado.tareas.map(tareaState => tareaState.tareaID === elem[0].tareaID ? elem[0] : tareaState)
        setProyectoID(tareaActualizado)
        setAlerta({
          msg: 'Se actualizo la tarea correctamente',
          error: false
        })
        setTimeout(() => {
          setAlerta({})
          setModalFormTarea(false)
        }, 2000)
      })
      .catch(error => console.log(error.message))
  }

  // ==============================
  // peticion eliminar tarea
  // ======================
  const eliminarProyecto = tareaId => {
    const config = getConfig()
    deleteTarea(tareaId, config)
      .then(elem => {
        const tareaActualizado = { ...proyectoID }
        tareaActualizado.tareas = tareaActualizado.tareas.filter(tareaState => tareaState.tareaID !== tareaId)
        setProyectoID(tareaActualizado)
        setAlerta({
          msg: elem,
          error: false
        })
      })
      .catch(error => console.log(error.message))
  }

  return (
    <TareaContext.Provider
      value={{
        alerta,
        modalSinTareas,
        modalFormTarea,
        dropTarea,
        proyectoID,
        tareaID,

        // ------------

        setModalSinTareas,
        setTareaID,
        setDropTarea,

        // -------------

        handleNuevaTarea,
        handleModal,
        handleEditarTarea,
        eliminarProyecto,
        onModalSinTareas,
        submitTarea
      }}
    >
      {children}
    </TareaContext.Provider>
  )
}

export default TareaContext
