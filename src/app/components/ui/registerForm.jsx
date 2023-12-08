import React, { useEffect, useState } from 'react'

import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleFieldChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'поле обязательно к заполнению'
      },
      isEmail: {
        message: 'Email указан не корректно'
      }
    },

    password: {
      isRequired: {
        message: 'поле обязательно к заполнению'
      },
      hasCapitalSymbol: {
        message: 'пароль должен содержать хотя бы одну заглавную букву'
      },
      hasDigit: {
        message: 'пароль должен содержать хотя бы одну цифру'
      },
      min: {
        value: 8,
        message: 'пароль должен быть не менее 8 символов'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    console.log(data)
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
      <button
        className="btn btn-primary w-100"
        type="submit"
        disabled={!isValid}
      >
        Принять
      </button>
    </form>
  )
}

export default RegisterForm
