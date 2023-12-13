import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const EditUserPage = ({ userId }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    name: ''
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState({})
  const [qualities, setQualities] = useState({})

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    api.qualities.fetchAll().then((qualities) => setQualities(qualities))

    api.professions
      .fetchAll()
      .then((professions) => setProfessions(professions))

    api.users.getById(userId).then((user) => {
      const copyData = { ...data }
      Object.keys(copyData).forEach(
        (key) => (copyData[key] = user[key] || copyData[key])
      )
      copyData.profession = user.profession._id
      copyData.qualities = user.qualities.map((q) => ({
        value: q._id,
        label: q.name
      }))
      setData(copyData)
    })
  }, [])

  useEffect(() => {
    setIsLoad(
      Object.keys(professions).length > 0 && Object.keys(qualities).length > 0
    )
    validate()
  }, [data])

  const history = useHistory()

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
    },

    // license: {
    //   isRequired: {
    //     message: 'Для регистрации Вы должны принять лицензию'
    //   }
    // }

    name: {
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

  const update = () => {
    const updatedData = {
      ...data,
      profession: Object.values(professions).find(
        (prof) => prof._id === data.profession
      ),
      qualities: data.qualities.map((dataQual) =>
        Object.values(qualities).find((qual) => qual._id === dataQual.value)
      )
    }
    api.users
      .update(userId, updatedData)
      .then((data) => history.replace(`/users/${data._id}`))
  }

  const handleGoBack = () => {
    history.push(`/users/${userId}`)
  }

  const handleFieldChange = (target) => {
    setData((prev) => ({ ...prev, ...target }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    update()
  }

  const isValid = Object.keys(errors).length === 0

  if (!isLoad) return 'Loading...'

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onFieldChange={handleFieldChange}
              error={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onFieldChange={handleFieldChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              name="password"
              value={data.password}
              onFieldChange={handleFieldChange}
              type="password"
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
              label="Качества"
              options={qualities}
              name="qualities"
              onFieldChange={handleFieldChange}
              defaultValue={data.qualities}
            />
            <button
              className="btn btn-primary w-100 fw-semibold"
              type="submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
          </form>
        </div>
        <button
          className="btn btn-info col-md-6 offset-md-3"
          type="button"
          onClick={handleGoBack}
        >
          Отменить
        </button>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  userId: PropTypes.string
}

export default EditUserPage
