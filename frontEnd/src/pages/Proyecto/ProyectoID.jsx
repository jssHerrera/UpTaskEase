import { lazy, Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ModalSinTareas from '../../container/ModalSinTareas'
import { useProyectos } from '../../hooks/useProyectos'
import { useTarea } from '../../hooks/useTarea'

const ModalAgregarTarea = lazy(() => import('../../container/ModalAgregarTarea'))

const Tareas = lazy(() => import('../../pages/Tarea/Tareas'))

const ProyectoID = () => {
  const { id } = useParams()
  const { obtenerProyectoID, proyectoID, loading } = useProyectos()
  const { modalSinTareas, modalFormTarea } = useTarea()

  const projTareas = proyectoID?.tareas?.every(tarea => !tarea)

  useEffect(() => {
    obtenerProyectoID(id)
  }, [id])

  if (loading) return 'Cargando...'

  return (
    <>
      {modalSinTareas && projTareas ? <ModalSinTareas /> : null}

      <Suspense fallback={<p>...loading</p>}>
        <Tareas proyectoID={proyectoID} />
      </Suspense>

      {modalFormTarea &&
        <Suspense fallback={<p>Loading..</p>}>
          <ModalAgregarTarea />
        </Suspense>}
    </>

  )
}

export default ProyectoID
