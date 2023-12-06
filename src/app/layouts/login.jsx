import React, { useState, useEffect } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'

const Login = () => {
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
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
              label="Password"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
