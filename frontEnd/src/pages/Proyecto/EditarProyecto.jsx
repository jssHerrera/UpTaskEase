import { lazy, Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProyectos } from '../../hooks/useProyectos'
import { FormularioProyecto } from '../../components'
const Alerta = lazy(() => import('../../container/Alerta'))

const EditarProyecto = () => {
  const { alerta, obtenerProyectoID, proyectoID, loading } = useProyectos()

  const { nombre } = proyectoID
  const { id } = useParams()
  const { msg } = alerta

  useEffect(() => {
    obtenerProyectoID(id)
  }, [id])

  if (loading) {
    return 'cargando'
  }

  return (
    <div className='flex justify-center items-center height-cont transition-all'>
      <div className='w-full max-w-[437px] flex flex-col'>
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-[20px] leading-6 font-bold'>
            Edita tu proyecto: {nombre}
          </p>
          {msg && (
            <Suspense fallback={<p>loading....</p>}>
              <Alerta msg={msg} />
            </Suspense>
          )}
        </div>
        <FormularioProyecto />
      </div>
    </div>

  )
}
export default EditarProyecto
