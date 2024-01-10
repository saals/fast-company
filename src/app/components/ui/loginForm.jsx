import React, { useEffect, useState } from 'react'

import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const { signIn } = useAuth()

  const handleFieldChange = (target) => {
    setData((prev) => ({ ...prev, ...target }))
    setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'поле обязательно к заполнению'
      }
    },

    password: {
      isRequired: {
        message: 'поле обязательно к заполнению'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await signIn(data)
      history.push('/')
    } catch (error) {
      setEnterError(error.message)
    }
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onFieldChange={handleFieldChange}
        error={errors.email}
      />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={data.password}
        onFieldChange={handleFieldChange}
        error={errors.password}
      />
      <CheckboxField
        name="stayOn"
        value={data.stayOn}
        onFieldChange={handleFieldChange}
      >
        Оставаться в системе
      </CheckboxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        className="btn btn-primary w-100"
        type="submit"
        disabled={!isValid || enterError}
      >
        Войти
      </button>
    </form>
  )
}

export default LoginForm
