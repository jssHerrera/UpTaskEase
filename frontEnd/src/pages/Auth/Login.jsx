import { lazy, Suspense, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FluentEye24Filled, FluentEyeOff16Filled } from '../../container/Icon'
import { useAuth } from '../../hooks/useAuth'
import { loginAutenticacion } from '../../services/Uptask.api'
const Alerta = lazy(() => import('../../container/Alerta'))
const data = {
  email: '',
  password: ''
}

const Login = () => {
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const navigate = useNavigate()

  const { setAuth } = useAuth()
  const [alerta, setAlerta] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [valueEmail, setValueEmail] = useState(data)
  const { email, password } = valueEmail

  const onImputChange = ({ target }) => {
    const { name, value } = target
    setValueEmail({
      ...valueEmail,
      [name]: value
    })
  }

  const handleMaouse = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(valueEmail).every(val => val === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return null
    }

    loginAutenticacion(valueEmail)
      .then(elem => {
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', elem.data.token)
        setAlerta({
          msg: elem.data.message,
          error: false
        })
        setAuth(elem.data)
        // setValueEmail(data)

        navigate('/proyectos', { replace: true })
      })
      .catch(error => {
        console.log(error)
        setAlerta({
          msg: error.response.data.message,
          error: true
        })
      })
    emailInputRef.current.blur()
    passwordInputRef.current.blur()
  }
  const { msg } = alerta

  return (
    <div className='flex justify-center items-center h-[calc(100vh-110px)]'>
      <div className='w-full max-w-[400px] flex flex-col text-dark'>
        <h2 className='text-2xl font-bold mb-7'>
          !Bienvenido/a
          <br />
          {msg && (
            <Suspense fallback={<p>loading....</p>}>
              <Alerta msg={msg} />
            </Suspense>
          )}
        </h2>
        <form className=' text-sm font-semibold' onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='email' className='block'>Email</label>
            <input
              id='email' type='email' name='email' ref={emailInputRef} placeholder='Introduce tu email' value={email} onChange={onImputChange} className='input-form input-succes p-[8px] input-dark '
            />
          </div>
          <div className='mb-10'>
            <label htmlFor='contraseña' className='block dark:text-white'>Contraseña</label>
            <div className='relative w-full'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                ref={passwordInputRef}
                placeholder='contraseña...'
                name='password'
                value={password}
                onChange={onImputChange}
                required
                className='input-form input-succes p-[8px] input-dark '
              />
              <div className='absolute top-0 right-0 h-full w-8 flex items-center justify-center font-medium '>
                <span
                  className='cursor-pointer p-[2px] transition'
                  onMouseOver={handleMaouse}
                  onMouseOut={handleMaouse}
                >
                  {showPassword
                    ? <FluentEye24Filled />
                    : <FluentEyeOff16Filled />}
                </span>
              </div>
            </div>
          </div>
          <div className='flex gap-3 justify-between mb-12'>
            <label>
              <input type='checkbox' name='remember' className='accent-emerald-500 cursor-pointer' />
              <span className='font-normal pl-[5px] dark:text-white'>Recuérdame</span>
            </label>
            <Link to='/olvidePassword' className='text-emerald-500 cursor-pointer hover:text-emerald-500/75'>¿Has olvidado la contraseña?</Link>
          </div>
          <div className='flex flex-col gap-4'>
            <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/90 text-white'>
              Iniciar sesión
            </button>
            <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/90 text-white'>
              Iniciar con Google
            </button>
            <Link to='/registrar' className='rounded-md w-full py-2 px-4 bg-black hover:bg-black/90 text-white text-center cursor-pointer transition'>
              Registrar nueva cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
