import { IcSharpKeyboardArrowDown, MaterialSymbolsDeleteOutline, MdiCheckboxBlankOutline, PhNotePencilDuotone } from './Icon'
import { useTarea } from '../hooks/useTarea'

export const DropTareas = ({ elem, dropTarea, setDropTarea }) => {
  const { handleModal, setTareaID, eliminarProyecto } = useTarea()

  const toggleDropdown = () => {
    setDropTarea(!dropTarea)
  }

  const onHandleElementsTareas = () => {
    handleModal()
    setDropTarea(false)
    setTareaID(elem)
  }

  const onHandleEliminarTarea = () => {
    eliminarProyecto(elem.tareaID)
    setDropTarea(false)
  }

  return (
    <div
      className='relative text-gray-800 dark:text-zinc-400' onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div
        className={`${dropTarea ? 'drop-btn drop-dark' : 'drop-btn-hover drop-dark-hover'} inline-flex items-center gap-1  py-1 px-2 rounded  transition-colors hover:cursor-pointer`}
        onClick={toggleDropdown}
      >
        <span className={dropTarea ? 'rotate-180' : 'rotate-0'}>
          <IcSharpKeyboardArrowDown />
        </span>
      </div>

      {dropTarea && (
        <div
          className='absolute right-0 mt-1 z-30 dark:text-zinc-400'
        >
          <div
            className='w-36 flex flex-col shadow-lg dark:shadow-2xl bg-white rounded-md dark:bg-gray-700'
          >
            <div className='flex flex-col text-gray-500 dark:text-zinc-400 capitalize'>
              <div className='w-full py-[4px]'>
                <p className='drop-item drop-btn-hover drop-dark-hover' onClick={onHandleElementsTareas}>
                  <PhNotePencilDuotone className='mr-1 group-hover:text-emerald-600   dark:group-hover:text-emerald-500' />
                  Editar
                </p>
              </div>
              <div className='w-full border-t-2 dark:border-gray-600 py-[4px] group'>
                <p
                  className='drop-item drop-btn-hover drop-dark-hover group-hover:text-red-500'
                  onClick={onHandleEliminarTarea}
                >
                  <MaterialSymbolsDeleteOutline
                    className='mr-1 group-hover:text-red-500'
                  />
                  Eliminar
                </p>
              </div>
              <div className='w-full border-t-2 dark:border-gray-600 py-[4px]'>
                <span className='drop-item drop-btn-hover drop-dark-hover'>
                  <MdiCheckboxBlankOutline className='mr-1 group-hover:text-emerald-600   dark:group-hover:text-emerald-500' />
                  Incompleta
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
