import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/UseForm'
import { formValidations } from '../../helpers/formValidations'
import { postRegistrarUsuario } from '../../services/Uptask.api'
import { Input, InputPassword } from '../../container/InputsForm'
import { useAuth } from '../../hooks/useAuth'
import { MdiArrowLeftThin } from '../../container/Icon'

const formData = {
  nombre: '',
  email: '',
  password: '',
  repetirPassword: ''
}
const FormularioUser = () => {
  const { setAlerta } = useAuth()
  const [formAlertInput, setFormAlertInput] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepit, setShowPasswordRepit] = useState(false)

  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const contraseñaInputRef = useRef(null)
  const repitContraseñaInputRef = useRef(null)

  const {
    formState,
    nombre,
    email,
    password,
    repetirPassword,
    onResetForm,
    onInputChange,
    isFormValid,
    nombreValid,
    emailValid,
    passwordValid,
    passwordRepitValid
  } = useForm(formData, formValidations)

  const handleMaousePass = () => {
    setShowPassword(!showPassword)
  }

  const handleMaousePassRepit = () => {
    setShowPasswordRepit(!showPasswordRepit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormAlertInput(true)

    if (!isFormValid) {
      return null
    }

    postRegistrarUsuario(formState)
      .then(elem => {
        setAlerta({
          msg: elem.message,
          error: false
        })
        onResetForm()
      })
      .catch(elem =>
        setAlerta({
          msg: elem.response.data.message,
          error: true
        })
      )

    setFormAlertInput(false)
    nameInputRef.current.blur()
    emailInputRef.current.blur()
    contraseñaInputRef.current.blur()
    repitContraseñaInputRef.current.blur()
  }

  return (
    <form className=' text-sm font-semibold' onSubmit={handleSubmit}>
      <Input
        label='Nombre'
        id='nombre'
        name='nombre'
        type='text'
        placeHolder='nombre'
        onHandleRef={nameInputRef}
        onHandleChange={onInputChange}
        value={nombre}
        error={!!nombreValid}
        touchet={formAlertInput}
      />

      <Input
        label='Email'
        id='email'
        name='email'
        type='email'
        placeHolder='ejemplo@correo.com'
        onHandleRef={emailInputRef}
        onHandleChange={onInputChange}
        value={email}
        error={!!emailValid}
        touchet={formAlertInput}
      />

      <InputPassword
        label='Password'
        id='password'
        name='password'
        type='password'
        placeHolder='***********'
        onHandleRef={contraseñaInputRef}
        onHandleChange={onInputChange}
        value={password}
        error={!!passwordValid}
        touchet={formAlertInput}
        handleMaouse={handleMaousePass}
        showPassword={showPassword}
      />

      <InputPassword
        label='Password'
        id='repetirPassword'
        name='repetirPassword'
        type='password'
        placeHolder='***********'
        onHandleRef={repitContraseñaInputRef}
        onHandleChange={onInputChange}
        value={repetirPassword}
        error={!!passwordRepitValid}
        touchet={formAlertInput}
        handleMaouse={handleMaousePassRepit}
        showPassword={showPasswordRepit}
      />

      <div className='flex gap-3 justify-end mb-5'>
        <Link to='/' className=' flex items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75'>
          <MdiArrowLeftThin />
          Atras
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/70 text-white transition-colors'>
          Crear cuenta
        </button>
      </div>
    </form>
  )
}

export default FormularioUser
