import { lazy, Suspense } from 'react'
import { FormularioProyecto } from '../../components'
import { useProyectos } from '../../hooks/useProyectos'
const Alerta = lazy(() => import('../../container/Alerta'))

const NuevoProyecto = () => {
  const { alerta } = useProyectos()
  const { msg } = alerta

  return (
    <div className='flex justify-center items-center height-cont  transition-all'>
      <div className='w-full max-w-[437px] flex flex-col'>
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-[20px] leading-6 font-bold'>
            !Bienvenido/a! Vamos a crear un nuevo proyecto
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

export default NuevoProyecto
