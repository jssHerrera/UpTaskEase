import { useCallback, useRef } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { Input, Select, TextArea } from '../../container/InputsForm'
import { validate } from '../../helpers/formValidNewTarea'
import { useTarea } from '../../hooks/useTarea'

const FormularioNuevaTarea = () => {
  const { tareaID, submitTarea } = useTarea()
  const params = useParams()
  const nombreInputRef = useRef(null)
  const descripcionInputRef = useRef(null)
  const prioridadInputRef = useRef(null)
  const fechaEntregaInputRef = useRef(null)
  const date = tareaID.fechaEntrega?.split('T')[0]

  const initialValues = Object.entries(tareaID).length !== 0
    ? {
        tareaID: tareaID.tareaID,
        nombre: tareaID.nombre,
        descripcion: tareaID.descripcion,
        prioridad: tareaID.prioridad,
        fechaEntrega: date
      }
    : {
        tareaID: '',
        nombre: '',
        descripcion: '',
        prioridad: '',
        fechaEntrega: ''
      }

  console.log(initialValues)

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async values => {
      try {
        const formValues = { ...values }
        formValues.proyectoID = params.id
        await submitTarea(values)

        formik.resetForm({
          values: {
            tareaID: '',
            nombre: '',
            descripcion: '',
            prioridad: '',
            fechaEntrega: ''
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
  const handleSelectChange = e => {
    const fieldName = e.target.name
    const value = e.target.value
    formik.setFieldValue(fieldName, value)
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (formik.isValid) {
      formik.handleSubmit()
      nombreInputRef.current.blur()
      descripcionInputRef.current.blur()
      prioridadInputRef.current.blur()
      fechaEntregaInputRef.current.blur()
    }
  }, [formik.handleSubmit])

  return (
    <form className='text-sm font-semibold' onSubmit={handleSubmit}>
      <Input
        label='Nombre Tarea'
        id='nombre'
        name='nombre'
        type='text'
        onHandleRef={nombreInputRef}
        onHandleBlur={formik.handleBlur}
        onHandleChange={formik.handleChange}
        value={formik.values.nombre}
        error={formik.errors.nombre}
        touchet={formik.touched.nombre}
      />
      <TextArea
        label='Descripcion'
        id='descripcion'
        name='descripcion'
        onHandleRef={descripcionInputRef}
        onHandleBlur={formik.handleBlur}
        onHandleChange={formik.handleChange}
        value={formik.values.descripcion}
        error={formik.errors.descripcion}
        touchet={formik.touched.descripcion}
      />
      <Select
        label='Prioridad'
        id='prioridad'
        name='prioridad'
        onHandleRef={prioridadInputRef}
        onHandleBlur={formik.handleBlur}
        onHandleChange={handleSelectChange}
        value={formik.values.prioridad}
        error={formik.errors.prioridad}
        touchet={formik.touched.prioridad}

      />

      <Input
        label='Fecha Entrega'
        id='fechaEntrega'
        name='fechaEntrega'
        type='date'
        onHandleRef={fechaEntregaInputRef}
        onHandleBlur={formik.handleBlur}
        onHandleChange={formik.handleChange}
        value={formik.values.fechaEntrega}
        error={formik.errors.fechaEntrega}
        touchet={formik.touched.fechaEntrega}
      />

      <div className='flex flex-col gap-4'>
        <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/70 text-white transition-colors'>
          {tareaID.tareaID ? 'Editar tarea' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  )
}

export default FormularioNuevaTarea
