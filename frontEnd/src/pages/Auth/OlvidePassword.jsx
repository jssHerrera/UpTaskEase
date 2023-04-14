import { lazy, Suspense, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { postOlvidePAssword } from '../../services/Uptask.api'
import { Input } from '../../container/InputsForm'
import { MdiArrowLeftThin } from '../../container/Icon'
const Alerta = lazy(() => import('../../container/Alerta'))

const OlvidePassword = () => {
  const emailInputRef = useRef(null)
  const [alerta, setAlerta] = useState({})
  const [valueEmail, setValueEmail] = useState({
    email: ''
  })
  const { email } = valueEmail

  const onImputChange = ({ target }) => {
    const { name, value } = target
    setValueEmail({
      ...valueEmail,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '' || !email.includes('@')) {
      setAlerta({
        msg: 'El correro es obligatior',
        error: true
      })
      return null
    }
    postOlvidePAssword({ email })
      .then(elem => setAlerta({
        msg: elem,
        error: false
      }))
      .catch(elem => setAlerta({
        msg: elem.response.data.message,
        error: true
      }))

    emailInputRef.current.blur()
    setValueEmail({
      email: ''
    })
  }

  const { msg } = alerta
  return (
    <div className='flex justify-center items-center h-[calc(100vh-110px)]'>
      <div className='w-full max-w-3xl flex flex-col text-dark'>
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-4xl leading-7 font-bold'>
            Recupera tu contraseña
          </p>
          <span className='leading-none text-base font-medium'>Introduce tu dirección de email. Te enviaremos un correo con un enlace para cambiar tu contraseña.</span>
          {msg && (
            <Suspense fallback={<p>loading....</p>}>
              <Alerta msg={msg} />
            </Suspense>
          )}
        </div>
        <form className=' text-sm font-semibold' onSubmit={handleSubmit}>
          <Input
            label='Nombre'
            id='email'
            name='email'
            type='email'
            placeHolder='ejemplo@correo.com'
            onHandleRef={emailInputRef}
            onHandleChange={onImputChange}
            value={email}
          />
          <div className='flex gap-3 justify-end mb-5'>
            <Link to='/' className=' flex items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75'>
              <MdiArrowLeftThin />
              Volver
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/70 text-white'>
              Enviar Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OlvidePassword
