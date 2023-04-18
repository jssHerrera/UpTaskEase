import { ContenTarea } from './ContenTarea'

export const TarjetaTarea = ({ proyectoID }) => {
  return (
    <div className=' relative w-full sm:min-w-[547px] sm:max-w-min min-h-[60px] flex flex-col gap-3 mb-4'>
      {proyectoID?.tareas?.map(elem => (
        <ContenTarea
          key={elem.descripcion}
          elem={elem}
        />
      ))}
    </div>
  )
}
