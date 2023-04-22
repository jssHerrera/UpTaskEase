import { motion } from 'framer-motion'
import { Suspense } from 'react'
import FormularioNuevaTarea from '../components/FormularioProyecto/FormularioNuevaTarea'
import { useTarea } from '../hooks/useTarea'
import Alerta from './Alerta'

const ModalAgregarTarea = () => {
  const { tareaID } = useTarea()
  const { alerta, handleModal } = useTarea()
  const { msg } = alerta

  return (
    <motion.section
      className='fixed inset-0 z-50 px-5  flex justify-center items-center dark:bg-black/70 bg-black/50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
      onClick={handleModal}
    >
      <motion.div
        className='w-full max-w-[437px] flex flex-col bg-white dark:bg-gray-900 py-8 px-4 rounded-md shadow-md'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-[20px] leading-6 font-bold'>
            Editar tu tarea: <span className='dark:text-emerald-500'>{tareaID?.nombre}</span>
          </p>
          {msg && (
            <Suspense fallback={<p>loading....</p>}>
              <Alerta msg={msg} />
            </Suspense>
          )}
        </div>
        <FormularioNuevaTarea />
      </motion.div>
    </motion.section>
  )
}
export default ModalAgregarTarea
