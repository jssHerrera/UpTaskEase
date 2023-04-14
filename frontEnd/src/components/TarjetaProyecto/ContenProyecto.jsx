import { Link } from 'react-router-dom'
import { GalaCalendar } from '../../container/Icon'
import { formateFecha } from '../../helpers/formateFecha'
import { lazy, Suspense, useState } from 'react'
import { useTarea } from '../../hooks/useTarea'

const DropList = lazy(() => import('../../container/DropList'))

export const ContenProyecto = ({ proyectoID, nombre, fechaEntrega, descripcion }) => {
  const { onModalSinTareas } = useTarea()
  const [isOpen, setIsOpen] = useState(false)
  const fecha = formateFecha(fechaEntrega)
  const handleCloseDrop = () => {
    setIsOpen(false)
  }

  return (
    <div className='w-full max-w-xs p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' onClick={handleCloseDrop}>
      <div className='w-full inline-flex gap-3 justify-between items-center mb-2'>
        <Link to={`${proyectoID}`} className='truncate tracking-tight font-semibold  hover:underline ' onClick={onModalSinTareas}>
          {nombre}
        </Link>
        <Suspense fallback={<p>loading...</p>}>
          <DropList id={proyectoID} isOpen={isOpen} setIsOpen={setIsOpen} />
        </Suspense>
      </div>
      <div className='overflow-hidden min-h-[68px] max-h-[68px] mb-3'>
        <p className='line-clamp-3 font-normal text-gray-500 dark:text-gray-400'>
          {descripcion}
        </p>
      </div>
      <div className='w-full inline-flex justify-between'>
        <div className='inline-flex gap-2 items-center bg-emerald-400 dark:bg-emerald-500/50 rounded-md px-2'>
          <GalaCalendar />
          End: {fecha}
        </div>
        <div className='flex justify-end  -space-x-1.5'>
          <img src='https://ui-avatars.com/api/?name=d&size=256' alt='Denis' className='w-5 h-5 rounded-full bg-slate-50 ring-2 ring-white dark:ring-gray-700' loading='lazy' />
          <img src='https://ui-avatars.com/api/?name=f&size=256' alt='Denis' className='w-5 h-5 rounded-full bg-slate-50 ring-2 ring-white dark:ring-gray-700' loading='lazy' />
          <img src='https://ui-avatars.com/api/?name=h&size=256' alt='Denis' className='w-5 h-5 rounded-full bg-slate-50 ring-2 ring-white dark:ring-gray-700' loading='lazy' />
        </div>
      </div>
    </div>
  )
}
