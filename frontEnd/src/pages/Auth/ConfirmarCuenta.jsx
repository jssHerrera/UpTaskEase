import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../../container/Alerta'
import { MdiArrowLeftThin, TablerSend } from '../../container/Icon'

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmaCuenta = async () => {
      try {
        const url = `http://localhost:3000/api/v1/usuarios/confirmar/${id}`
        const { data } = await axios(url)
        setAlerta({
          msg: data.message,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.message,
          error: false
        })
        setCuentaConfirmada(false)
      }
    }
    confirmaCuenta()
  }, [])

  const { msg } = alerta

  return (
    <div className='flex justify-center items-center h-[calc(100vh-110px)]'>
      <div className='w-full max-w-lg flex flex-col text-dark'>
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-center text-4xl leading-7 font-bold'>
            Confirma Tu Cuenta
          </p>
          <span className='text-center leading-none text-base font-medium'>Comienza a crear tus proyectos .</span>

        </div>

        <div className=' py-8 text-center'>
          {msg && <Alerta msg={msg} />}

          <Link to='/' className=' flex justify-center gap-3 items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75 mt-4'>
            {cuentaConfirmada
              ? (
                <>
                  <TablerSend />
                  <span>Inisiar sesion</span>
                </>
                )
              : <>
                <MdiArrowLeftThin />
                Volver
              </>}

          </Link>
        </div>

        {/* <div className='flex flex-col sm:flex-row gap-3 items-center justify-between mb-5 transition-all'>
        </div> */}
      </div>
    </div>
  )
}

export default ConfirmarCuenta
