import { useEffect } from 'react'
import { ModalOpcionesTarea } from '../../container/ModalOpcionesTarea'
import { useTarea } from '../../hooks/useTarea'
import { ContenTarea } from './ContenTarea'

export const TarjetaTarea = ({ proyectoID }) => {
  const { tareas } = proyectoID
  const { points, modalOpcionTarea, setModalOpcionTarea } = useTarea()
  // const { x } = points
  // const bottom = window.innerHeight - points.y
  // const modalPosition = points.y < window.innerHeight / 2 ? points.y : bottom

  // const top = points.y - 140
  // const x = points.x - 20

  // const y = top < window.innerHeight - 150 ? top : window.innerHeight - 150

  // console.log('================')
  // console.log(window.innerHeight - 250)
  // console.log(y)

  useEffect(() => {
    const onHandleClick = () => setModalOpcionTarea(false)
    window.addEventListener('click', onHandleClick)
    return () => window.removeEventListener('click', onHandleClick)
  }, [])

  return (
    <div className=' relative w-full sm:min-w-[547px] sm:max-w-min min-h-[60px] flex flex-col gap-3 mb-4'>
      {tareas?.map(elem => (
        <ContenTarea
          key={elem.tareaID}
          {...elem}
        />
      ))}

      {modalOpcionTarea && <ModalOpcionesTarea {...points} />}
    </div>
  )
}
