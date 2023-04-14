import { useState } from 'react'
import { useProyectos } from '../hooks/useProyectos'
import { MdiClose } from './Icon'

export const ModalEliminar = () => {
  const { alerta, setEliminar, isEliminarID, loading, eliminarProyecto } = useProyectos()
  const [msgEliminado, setMsgEliminado] = useState(true)

  const handleCloseModal = () => {
    setEliminar(false)
  }

  const handleEliminar = () => {
    eliminarProyecto(isEliminarID)
    setMsgEliminado(false)

    setTimeout(() => {
      setMsgEliminado(true)
      setEliminar(false)
    }, 2000)
  }
  // bg-white-600  bg-clip-padding backdrop-filter backdrop-blur-md
  return (
    <div
      className='fixed inset-0 z-50 px-2  flex justify-center items-center bg-black/70 bg-opacity-100'
      onClick={handleCloseModal}
    >
      <div
        className='relative bg-white rounded-lg shadow dark:bg-gray-700'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button type='button' className='absolute top-1 right-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white' onClick={handleCloseModal}>
          <MdiClose />
          <span className='sr-only'>Close modal</span>
        </button>
        <div className='p-6 text-center'>
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Esta seguro de eliminar este proyecto?
          </h3>
          {msgEliminado
            ? (
              <>
                <button
                  type='button' className='text-white bg-red-600 hover:bg-red-800 focus:outline-none border-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2' onClick={handleEliminar}
                >
                  Yes, I'm sure
                </button>
                <button type='button' className='text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600' onClick={handleCloseModal}>
                  No, cancel
                </button>
              </>
              )
            : (loading === true)
                ? <p>cargando.....</p>
                : (
                  <p>{alerta.msg}</p>
                  )}
        </div>
      </div>
    </div>
  )
}
