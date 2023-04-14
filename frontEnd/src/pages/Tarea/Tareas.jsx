import { TarjetaTarea } from '../../components/TarjetaTarea/TarjetaTarea'
import { useTarea } from '../../hooks/useTarea'

const Tareas = ({ proyectoID }) => {
  const { handleModal } = useTarea()
  return (
    <div className='flex gap-3 flex-col items-center justify-center transition-all'>
      <div
        className='w-full sm:min-w-[547px] sm:max-w-min min-h-[60px] flex items-center justify-center input-btn input-form input-dark font-norma text-center'
        onClick={handleModal}
      >
        New Task
      </div>

      <TarjetaTarea proyectoID={proyectoID} />
    </div>
  )
}
export default Tareas
