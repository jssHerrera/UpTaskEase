import { LogosFigma } from '../../container/Icon'
import { hashCode, intToRGB } from '../../helpers/coloresDinamicos'
import { formateFecha2 } from '../../helpers/formateFecha'
import { useTarea } from '../../hooks/useTarea'

export const ContenTarea = ({ tareaID, nombre, descripcion, prioridad, fechaEntrega }) => {
  const { setModalOpcionTarea, setPoints, setTareaID } = useTarea()

  const fecha = formateFecha2(fechaEntrega)

  const coloresPrioridad = {
    Alta: 'hsla(3, 85%, 55%, 1)',
    Media: 'hsla(162, 65%, 47%, 0.76)',
    Baja: 'hsla(180, 1%, 30%, 1)'
  }
  const colorPrioridad = coloresPrioridad[prioridad]

  return (

    <div
      className='input-btn input-form input-dark p-2 flex flex-col'
      onContextMenu={(e) => {
        e.preventDefault()
        setModalOpcionTarea(true)
        setTareaID({
          tareaID,
          nombre,
          descripcion,
          prioridad,
          fechaEntrega
        })
        setPoints({ x: e.pageX, y: e.pageY })
      }}
    >
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center '>
          <span
            className='w-5 border border-gray-300 dark:border-gray-600 h-5 flex items-center justify-center rounded-md'
            style={{ backgroundColor: intToRGB(hashCode(tareaID)) }}
          >
            <LogosFigma />
          </span>
          <p className='font-semibold'>{nombre}</p>
        </div>
        <span
          className='min-w-[50px] min-h-[25px] h-full flex items-center justify-center text-white bg-red-500/70 px-1 border border-gray-500 rounded-md'
          style={{ backgroundColor: colorPrioridad }}
        >
          {prioridad}
        </span>
      </div>
      <span>
        {descripcion}
      </span>
      <div className='dark:text-gray-500 text-gray-400'>
        <p>
          fecha de entrega: <span className='text-gray-300'>{fecha}</span>
        </p>
      </div>
    </div>
  )
}
