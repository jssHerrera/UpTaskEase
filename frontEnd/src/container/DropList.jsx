import { Link } from 'react-router-dom'
import { useProyectos } from '../hooks/useProyectos'
import { IcSharpKeyboardArrowDown } from './Icon'

const DropList = ({ id, isOpen, setIsOpen, onModalSinTareas }) => {
  const { setEliminar, setEliminarID } = useProyectos()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleClickEliminar = () => {
    setEliminar(true)
    setIsOpen(false)
    setEliminarID(id)
  }

  return (
    <div
      className='relative text-gray-800 dark:text-zinc-400' onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div
        className={`${isOpen ? 'drop-btn drop-dark' : 'drop-btn-hover drop-dark-hover'} inline-flex items-center gap-1  py-1 px-2 rounded  transition-colors hover:cursor-pointer`}
        onClick={toggleDropdown}
      >
        <span className={isOpen ? 'rotate-180' : 'rotate-0'}>
          <IcSharpKeyboardArrowDown />
        </span>
      </div>

      {isOpen && (
        <div
          className='absolute right-0 mt-1 z-30 dark:text-zinc-400'
        >
          <div
            className='w-36 flex flex-col shadow-lg dark:shadow-2xl bg-white rounded-md dark:bg-gray-700'
          >
            <div className='flex flex-col text-gray-500 dark:text-zinc-400 capitalize'>
              <div className='w-full py-[4px]'>
                <Link to={`${id}`} className='drop-item drop-btn-hover drop-dark-hover' onClick={onModalSinTareas}>
                  Ver
                </Link>
              </div>
              <div className='w-full border-t-2 dark:border-gray-600 py-[4px]'>
                <Link to={`editar/${id}`} className='drop-item drop-btn-hover drop-dark-hover'>
                  Actualizar
                </Link>
              </div>
              <div className='w-full border-t-2 dark:border-gray-600 py-[4px]' onClick={handleClickEliminar}>
                <span className='drop-item drop-btn-hover drop-dark-hover'>
                  Eliminar
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropList
