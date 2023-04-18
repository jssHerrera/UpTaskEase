import { LogosFigma } from '../../container/Icon'
import { coloresDinamicos } from '../../helpers/coloresDinamicos'
import { formateFecha2 } from '../../helpers/formateFecha'
import { upperCaseFirs } from '../../helpers/UpperCase'
import { DropTareas } from '../../container/DropTareas'
import { useTarea } from '../../hooks/useTarea'

export const ContenTarea = ({ elem }) => {
  const { tareaID, nombre, descripcion, prioridad, fechaEntrega } = elem
  const { handleCloseDrop } = useTarea()

  const closeDrop = () => {
    handleCloseDrop()
  }

  const titulo = upperCaseFirs(nombre)
  const contenido = upperCaseFirs(descripcion)
  const fecha = formateFecha2(fechaEntrega)
  const colors = coloresDinamicos(tareaID)

  return (
    <div
      className='input-btn input-form input-dark p-2 flex flex-col'
      onClick={closeDrop}
    >
      <div className='flex gap-2 '>
        <div className='flex gap-2'>
          <span
            className='w-5 border border-gray-300 dark:border-gray-600 h-5 flex items-center justify-center rounded-md'
            style={{ backgroundColor: colors }}
          >
            <LogosFigma />
          </span>
        </div>
        <div className='w-full'>
          <div className='flex justify-between '>
            <p className='font-semibold'>{titulo}</p>
            <DropTareas elem={elem} />
          </div>
          <div className='pt-2'>
            <p>
              {contenido}
            </p>
            <p className='text-gray-500'>
              Fecha de entrega: <span className='text-gray-400'>{fecha}</span>
            </p>
            <p className='text-gray-500'>
              Prioridad: <span className='text-gray-400'>{prioridad}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
