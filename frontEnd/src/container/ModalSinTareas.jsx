import { motion } from 'framer-motion'
import { useTarea } from '../hooks/useTarea'
import { MdiClose } from './Icon'

const ModalSinTareas = () => {
  const { setModalSinTareas } = useTarea()
  return (
    <motion.section
      className='fixed inset-0 z-50 px-5  flex justify-center items-center dark:bg-black/70 bg-black/50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
      onClick={() => setModalSinTareas(false)}
    >
      <motion.div
        className='w-full max-w-[437px] flex flex-col bg-white dark:bg-gray-900 py-8 px-4 rounded-md shadow-md relative'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='text-center leading-7 transition'>
          <p className='text-[17px]  leading-6 font-bold text-emerald-500/70'>
            !Aun no tienes tareas para este proyecto! <br />Vamos a crear una nueva!!
          </p>
        </div>
        <div className='absolute top-0 right-0 p-2'>
          <span className='cursor-pointer' onClick={() => setModalSinTareas(false)}>
            <MdiClose className='text-gray-500 dark:hover:text-white transition-colors' />
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}
export default ModalSinTareas
