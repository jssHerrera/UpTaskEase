import { useRef, useState, useEffect, Suspense, lazy } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getComprobarToken, postNuevoPassword } from '../../services/Uptask.api'
import { MdiArrowLeftThin, FluentEye24Filled, TablerSend } from '../../container/Icon'
const Alerta = lazy(() => import('../../container/Alerta'))

const NuevoPassword = () => {
  const { token } = useParams()
  const passwordInputRef = useRef(null)
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [valuePassword, setValuePassword] = useState({
    password: ''
  })
  const { password } = valuePassword

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await getComprobarToken(token)
        setTokenValido(true)
      } catch (elem) {
        setAlerta({
          msg: elem.response.data.message,
          error: true
        })
      }
    }
    comprobarToken()
  }, [token])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setValuePassword({
      ...valuePassword,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.length < 5) {
      setAlerta({
        msg: 'la contraseña debe tener como minimo 5 caracteres',
        error: true
      })
      return null
    }

    postNuevoPassword(token, password)
      .then(elem => {
        setAlerta({
          msg: elem.data.message,
          error: false
        })
        setPasswordModificado(true)
      })
      .catch(elem =>
        setAlerta({
          msg: elem.response.data.error,
          error: false
        })
      )

    passwordInputRef.current.blur()

    setValuePassword({
      password: ''
    })
  }
  const { msg } = alerta

  return (
    <div className='flex justify-center items-center h-[calc(100vh-110px)]'>
      <div className='w-full max-w-2xl flex flex-col text-dark'>
        <div className=' flex flex-col gap-3 leading-7 mb-8 transition'>
          <p className='text-4xl leading-7 font-bold'>
            Restablece tu contraseña
          </p>
          <span className='leading-none text-base font-medium'>Introduce tu nueva contraseña  y no pierdas acceso a tus proyectos.</span>
          {msg && (
            <Suspense fallback={<p>loading....</p>}>
              <Alerta msg={msg} />
            </Suspense>
          )}
        </div>
        {tokenValido && (
          <form className=' text-sm font-semibold' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='password' className='block'>Contraseña</label>
              <div className='focus-within:border-emerald-500 input-box input-dark '>
                <input
                  id='password' ref={passwordInputRef} type={showPassword ? 'text' : 'password'} placeholder='***********' name='password' value={password} onChange={onInputChange} className='bg-transparent border-none dark:placeholder-gray-500  input-form'
                />
                <div className='px-2'>
                  <FluentEye24Filled className='show-pass' onMouseOver={() => setShowPassword(true)} onMouseOut={() => setShowPassword(false)} />
                </div>
              </div>
            </div>
            <div className='flex gap-3 justify-end mb-5'>
              <Link to='/' className=' flex items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75'>
                <MdiArrowLeftThin />
                Atras
              </Link>
            </div>
            <div className='flex flex-col gap-4'>
              <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 text-white'>
                Guardar Nuevo Password
              </button>
            </div>
            {passwordModificado && (
              <div className='flex gap-3 justify-center pt-10'>
                <Link to='/' className=' flex gap-2 items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75'>
                  <TablerSend />
                  Inicia sesion
                </Link>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  )
}

export default NuevoPassword
