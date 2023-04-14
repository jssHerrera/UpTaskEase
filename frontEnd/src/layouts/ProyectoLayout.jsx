import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import { ModalEliminar } from '../container/ModalEliminar'
import { useProyectos } from '../hooks/useProyectos'

export const ProyectoLayout = () => {
  const { isEliminar } = useProyectos()
  return (
    <div className='min-h-screen flex flex-col relative layout-dark text-dark'>
      <Header />
      <main className='mt-[70px] px-5 sm:px-10'>
        <Outlet />
      </main>
      {isEliminar && <ModalEliminar />}

    </div>
  )
}
