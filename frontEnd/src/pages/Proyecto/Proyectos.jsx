import { lazy, memo, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { TablerPlus } from '../../container/Icon'
import { useProyectos } from '../../hooks/useProyectos'

const TarjetaProjecto = lazy(() => import('../../components/TarjetaProyecto/TarjetaProjecto'))

const Proyectos = memo(function Proyectos () {
  const { proyectos } = useProyectos()
  // console.log(proyectos)
  return (
    <div className='relative'>
      <div className='flex flex-col gap-7 h-full relative overflow-hidden'>
        <div className='flex justify-between text-dark'>
          <h1 className='text-xl font-semibold'>Proyectos</h1>
          <Link to='crear-proyecto' className=' flex items-center justify-center border rounded-md p-1 text-white bg-emerald-500 hover:bg-emerald-500/80 dark:border-gray-700/80 dark:bg-emerald-400/80 transition'>
            <TablerPlus className='text-xl block sm:hidden' />
            <span className='hidden sm:block'>Crear proyecto</span>
          </Link>
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <TarjetaProjecto proyectos={proyectos} />
        </Suspense>
      </div>
    </div>
  )
})

export default Proyectos
