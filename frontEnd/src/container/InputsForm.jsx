import { FluentEye24Filled, FluentEyeOff16Filled } from './Icon'

// =======================
// Text - email
// =======================
export const Input = ({
  label,
  id,
  name,
  type,
  placeHolder,
  onHandleRef,
  onHandleChange,
  onHandleBlur,
  value,
  error,
  touchet
}) => (

  <div className='mb-6'>
    <label htmlFor={id} className='block mb-2 text-sm font-medium text-dark'>{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeHolder}
      ref={onHandleRef}
      onChange={onHandleChange}
      onBlur={onHandleBlur}
      value={value}
      autoComplete='off'
      required
      className={`${error && touchet ? 'input-error' : 'input-succes'} input-form p-2.5 input-dark `}
    />
  </div>
)

// =======================
// Text Area
// =======================
export const TextArea = ({
  label,
  id,
  name,
  onHandleRef,
  onHandleChange,
  onHandleBlur,
  value,
  error,
  touchet
}) => (
  <div className='mb-6'>
    <label htmlFor={id} className='block text-dark'>{label}</label>
    <textarea
      id={id}
      name={name}
      rows='3'
      ref={onHandleRef}
      value={value}
      onBlur={onHandleBlur}
      onChange={onHandleChange}
      autoComplete='off'
      required
      className={`${error && touchet ? 'input-error' : 'input-succes'} input-form p-2.5 input-dark `}
    />

  </div>

)

// =======================
// password
// =======================
export const InputPassword = ({
  label,
  id,
  name,
  type,
  placeHolder,
  onHandleRef,
  onHandleChange,
  onHandleBlur,
  value,
  error,
  touchet,
  handleMaouse,
  showPassword
}) => (

  <div className='mb-6'>
    <label htmlFor={id} className='block mb-2 text-sm font-medium text-dark'>{label}</label>
    <div className='relative w-full'>
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : type}
        placeholder={placeHolder}
        ref={onHandleRef}
        onChange={onHandleChange}
        onBlur={onHandleBlur}
        value={value}
        autoComplete='off'
        required
        className={`${error && touchet ? 'input-error' : 'input-succes'} input-form p-2.5 input-dark `}
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
)

// =======================
// Select Option
// =======================
const Prioridad = ['Baja', 'Media', 'Alta']
export const Select = ({
  label,
  id,
  name,
  onHandleRef,
  onHandleChange,
  onHandleBlur,
  value,
  error,
  touchet
}) => (

  <div className='mb-6'>
    <label htmlFor={id} className='block text-dark'>{label}</label>
    <select
      id={id}
      name={name}
      ref={onHandleRef}
      onBlur={onHandleBlur}
      onChange={onHandleChange}
      value={value}
      autoComplete='off'
      required
      className={`${error && touchet ? 'input-error' : 'input-succes'} input-form p-2.5 input-dark`}
    >
      <option>--Seleccionar--</option>
      {Prioridad.map(elem => (
        <option key={elem} value={elem}>{elem}</option>
      ))}
    </select>

  </div>

)
