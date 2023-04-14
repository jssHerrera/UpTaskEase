import { useEffect, useState, useMemo } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})
  const [passwordRepitValid, setpasswordRepitValid] = useState({})

  useEffect(() => {
    createValidatos()
  }, [formState])

  useEffect(() => {
    repitPAssValid()
  }, [formState?.repetirPassword])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }
    return true
  }, [formValidation])

  const onInputChange = ({ target }) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  const createValidatos = () => {
    const formChedValues = {}
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]
      formChedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage
    }
    setFormValidation(formChedValues)
  }

  const repitPAssValid = () => {
    const { password, repetirPassword } = formState

    const valid = repetirPassword.length >= 5
      ? password === repetirPassword
        ? null
        : 'Los password no son iguales'
      : 'El Password es muy corto, agrega minimo 5 caracteres'
    setpasswordRepitValid(valid)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    passwordRepitValid,
    isFormValid
  }
}
