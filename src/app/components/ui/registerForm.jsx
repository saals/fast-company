import React, { useEffect, useState } from 'react'

import api from '../../api'
import { validator } from '../../utils/validator'

import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const [errors, setErrors] = useState({})

  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    api.professions
      .fetchAll()
      .then((professions) => setProfessions(professions))

    api.qualities.fetchAll().then((qualities) => setQualities(qualities))
  }, [])

  const handleFieldChange = (target) => {
    setData((prev) => ({ ...prev, ...target }))
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
    },

    profession: {
      isRequired: {
        message: 'обязательно укажите профессию'
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
      <SelectField
        label="Профессия"
        name="profession"
        value={data.profession}
        options={professions}
        onFieldChange={handleFieldChange}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Муж', value: 'male' },
          { name: 'Жен', value: 'female' }
        ]}
        name="sex"
        value={data.sex}
        onFieldChange={handleFieldChange}
      />

      <MultiSelectField
        options={qualities}
        name="qualities"
        onFieldChange={handleFieldChange}
        defaultValue={data.qualities}
        label="Качества"
      />

      <button
        className="btn btn-primary w-100"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  )
}

export default RegisterForm
