import { useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Input, TextArea } from '../../container/InputsForm'
import { validate } from '../../helpers/formValidations'
import { useProyectos } from '../../hooks/useProyectos'
import { MdiArrowLeftThin } from '../../container/Icon'

export const FormularioProyecto = () => {
  const { mostrarAlerta, submitProyecto, proyectoID } = useProyectos()
  const params = useParams()
  const nombreInputRef = useRef(null)
  const descripcionInputRef = useRef(null)
  const fechaEntregaInputRef = useRef(null)
  const clienteInputRef = useRef(null)
  const date = proyectoID.fechaEntrega?.split('T')[0]

  const initialValues = params.id
    ? {
        id: proyectoID.proyectoID,
        nombre: proyectoID.nombre,
        descripcion: proyectoID.descripcion,
        fechaEntrega: date,
        cliente: proyectoID.cliente
      }
    : {
        id: '',
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        cliente: ''
      }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async values => {
      try {
        await submitProyecto(values)
        formik.resetForm({
          values: {
            id: '',
            nombre: '',
            descripcion: '',
            fechaEntrega: '',
            cliente: ''
          }
        })
      } catch (error) {
        mostrarAlerta({
          msg: 'Error al enviar los datos del formulario',
          error: true
        })
      }
    }
  })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (formik.isValid) {
      formik.handleSubmit()
      nombreInputRef.current.blur()
      descripcionInputRef.current.blur()
      fechaEntregaInputRef.current.blur()
      clienteInputRef.current.blur()
    }
    mostrarAlerta({
      msg: 'todos los campos son obligatorios',
      error: true
    })
  }, [formik.handleSubmit])

  return (
    <form className='text-sm font-semibold' onSubmit={handleSubmit}>
      <Input
        label='Nombre Proyecto'
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
      <Input
        label='Cliente'
        id='cliente'
        name='cliente'
        type='text'
        onHandleRef={clienteInputRef}
        onHandleBlur={formik.handleBlur}
        onHandleChange={formik.handleChange}
        value={formik.values.cliente}
        error={formik.errors.cliente}
        touchet={formik.touched.cliente}
      />

      <div className='flex gap-3 justify-end mb-5'>
        <Link to='/proyectos' className=' flex items-center text-emerald-500 cursor-pointer hover:text-emerald-500/75'>
          <MdiArrowLeftThin />
          Atras
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        <button type='submit' className='rounded-md w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-500/70 text-white transition-colors'>
          {params.id ? 'Editar Proyecto' : 'Crear Proyecto'}

        </button>
      </div>
    </form>
  )
}
