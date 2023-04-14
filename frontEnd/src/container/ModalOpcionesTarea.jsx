import { useTarea } from '../hooks/useTarea'
import {
  IcRoundWarningAmber,
  MaterialSymbolsDeleteOutline,
  PhCheckSquareOffsetBold,
  PhNotePencilDuotone
} from './Icon'

export const ModalOpcionesTarea = ({ x, y }) => {
  const { handleEditarTarea, tareaID } = useTarea()

  const onHandleClickEditar = () => {
    handleEditarTarea(tareaID)
  }

  return (
    <div
      className='fixed min-w-[150px] glass'
      style={{
        left: `${x}px`,
        top: `${y}px`
      }}
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      <div className='flex flex-col text-gray-500 capitalize dark:text-zinc-400'>
        <div className='w-full dark:border-gray-600 py-[4px] group'>
          <span
            className='drop-item hover:bg-gray-500/10 dark:hover:bg-gray-500/30 '
            onClick={onHandleClickEditar}
          >
            <PhNotePencilDuotone className='mr-1 group-hover:text-emerald-600   dark:group-hover:text-emerald-500' />
            Editar
          </span>
        </div>
        <div className='w-full group border-t-4 dark:border-gray-600 py-[4px] group'>
          <span className='drop-item hover:bg-gray-500/10 dark:hover:bg-gray-500/30 '>
            <MaterialSymbolsDeleteOutline className='mr-1 group-hover:text-red-400' />
            Eliminar
          </span>
        </div>
        <div className='w-full group border-t-4 dark:border-gray-600 py-[4px] group'>
          <span className='drop-item hover:bg-gray-500/10 dark:hover:bg-gray-500/30  '>
            <PhCheckSquareOffsetBold className='mr-1 group-hover:text-emerald-600  dark:group-hover:text-emerald-500' />
            completado
          </span>
        </div>
        <div className='w-full group border-t-4 dark:border-gray-600 py-[4px] group'>
          <span className='drop-item hover:bg-gray-500/10 dark:hover:bg-gray-500/30 '>
            <IcRoundWarningAmber className='mr-1 group-hover:text-red-400' />
            incompleto
          </span>
        </div>
      </div>
    </div>
  )
}
