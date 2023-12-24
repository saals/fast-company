import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'

const initialState = { userId: '', content: '' }

const NewCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})

  const [users, setUsers] = useState([])

  useEffect(() => {
    // api.users.fetchAll().then((users) => setUsers(users))
    api.users.fetchAll().then(setUsers)
  }, [])

  const handleFieldChange = (target) => {
    setData((prev) => ({ ...prev, ...target }))
  }

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'поле обязательно к заполнению'
      },
      min: {
        value: 3,
        message: 'комментарий не должен быть менее 3 символов'
      }
    },

    userId: {
      isRequired: {
        message: 'обязательно укажите имя'
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
    onSubmit(data)
    clearForm()
  }

  const clearForm = () => {
    setData(initialState)
    setErrors({})
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          // label="Имя"
          name="userId"
          value={data.userId}
          options={users}
          onFieldChange={handleFieldChange}
          error={errors.userId}
        />
        <TextAreaField
          label="Комментарий"
          name="content"
          value={data.content}
          onFieldChange={handleFieldChange}
          error={errors.content}
        />
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={!isValid}
        >
          Опубликовать
        </button>
      </form>
    </div>
  )
}

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default NewCommentForm
