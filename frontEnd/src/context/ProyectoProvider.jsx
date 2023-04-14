import { useState, createContext, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isExpired } from 'react-jwt'
import { getConfig } from '../helpers/getConfigHeaders'
import { postNuevoProyecto, getProyectos, getProyectoID, putEditandoProyecto, deleteProyecto } from '../services/utaskProyecto.api'

const ProyectoContext = createContext()

export const ProyectoProvider = ({ children }) => {
  const { auth } = useAuth()
  const [proyectos, setProyectos] = useState([])
  const [proyectoID, setProyectoID] = useState({})
  const [isEliminar, setEliminar] = useState(false)
  const [isEliminarID, setEliminarID] = useState({})
  const [cuenta, setCuenta] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [loading, setLoadign] = useState(false)
  const navigate = useNavigate()

  // =========================
  // Cuenta de user
  // =========================
  const handleClickCuenta = useCallback(() => {
    setCuenta(!cuenta)
  }, [cuenta])

  // =========================
  // Obtener proyectos
  // =========================
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token')

    const isMyTokenExpired = isExpired(token)
    if (isMyTokenExpired) return

    const config = getConfig()
    getProyectos(config)
      .then(elem => {
        setProyectos(elem)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  }, [auth])

  // =========================
  // crea nuevo proyecto
  // =========================
  const submitProyecto = (proyecto) => {
    if (proyecto.id === '') {
      crearProyecto(proyecto)
    } else {
      editarProyecto(proyecto)
    }
  }

  // =========================
  const crearProyecto = useCallback((proyecto) => {
    const config = getConfig()
    postNuevoProyecto(proyecto, config)
      .then(elem => {
        setProyectos([...proyectos, elem.proyecto])
        setAlerta({
          msg: elem.message,
          error: false
        })
        setTimeout(() => {
          setAlerta({})
          navigate('/proyectos')
        }, 2000)
      })
      .catch(error => {
        setAlerta({
          msg: error.data.message,
          error: true
        })
      })
  }, [proyectos])

  // =========================
  const editarProyecto = useCallback((proyecto) => {
    const config = getConfig()
    putEditandoProyecto(proyecto, config)
      .then(elem => {
        const proyectoActualizado = proyectos.map(
          proyectoState => proyectoState.proyectoID === elem.result.proyectoID ? elem.result : proyectoState)
        setProyectos(proyectoActualizado)
        setAlerta({
          msg: 'Se actualizo el proyecto correctamente',
          error: false
        })
        setTimeout(() => {
          setAlerta({})
          navigate('/proyectos')
        }, 2000)
      })
      .catch(elem => console.log(elem))
  }, [proyectos])

  // ======================
  // menssage alerta
  // ======================
  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    }, 3000)
  }

  // ======================
  // proyectoID
  // ======================
  const obtenerProyectoID = useCallback(id => {
    setLoadign(true)
    const config = getConfig()

    getProyectoID(id, config)
      .then(elem => setProyectoID(elem))
      .catch(error => {
        console.log(error)
        setAlerta(error.data)
      })
      .finally(() => setLoadign(false))
  }, [proyectoID])

  // ======================
  // Eliminar proyecto
  // ======================
  const eliminarProyecto = useCallback(id => {
    setLoadign(true)
    const config = getConfig()

    deleteProyecto(id, config)
      .then(elem => {
        const proyectoActualizado = proyectos.filter(
          proyectoState => proyectoState.proyectoID !== id)
        setProyectos(proyectoActualizado)
        setAlerta({
          msg: elem.message,
          error: false
        })
        setTimeout(() => {
          setAlerta({})
        }, 2000)
      })
      .catch(error => console.log(error))
      .finally(() => setLoadign(false))
  }, [proyectos])

  return (
    <ProyectoContext.Provider
      value={{
        alerta,
        cuenta,
        handleClickCuenta,
        proyectos,
        isEliminar,
        setEliminar,
        mostrarAlerta,
        submitProyecto,
        obtenerProyectoID,
        proyectoID,
        setProyectoID,
        isEliminarID,
        setEliminarID,
        loading,
        eliminarProyecto
      }}
    >
      {children}
    </ProyectoContext.Provider>
  )
}

export default ProyectoContext
