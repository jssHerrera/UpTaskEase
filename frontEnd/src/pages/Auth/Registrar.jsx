import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
const Alerta = lazy(() => import('../../container/Alerta'))

const FormularioUser = lazy(() => import('../../components/FormularioProyecto/FormularioUser'))

const Registrar = () => {
  const { alerta, setAlerta } = useAuth()
  const { msg } = alerta
  const navigate = useNavigate()

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 2500)
    }
  }, [msg])
  return (
    <div className='flex justify-center items-center h-[calc(100vh-110px)] mt-2 transition-all'>
      <div className='w-full max-w-[437px] flex flex-col text-dark'>
        <div className=' flex flex-col gap-3 leading-7 mb-8'>
          <p className='text-[20px] leading-6 md:text-[24px] font-bold'>
            !Bienvenido/a! Vamos a crear tu perfil
          </p>
          <span className='leading-none text-base font-medium text-gray-400'>
            {msg
              ? (
                <Suspense fallback={<p>loading....</p>}>
                  <Alerta msg={msg} />
                </Suspense>
                )
              : 'Necesitamos que nos indiques unos datos antes de empezar'}

          </span>
        </div>
        <Suspense fallback={<p>cargando</p>}>
          <FormularioUser />
        </Suspense>
      </div>
    </div>
  )
}

export default Registrar
