import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { validator } from '../../../utils/validator'

import TextAreaField from '../form/textAreaField'

const NewCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

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
    setData({})
    setErrors({})
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="Комментарий"
          name="content"
          value={data.content || ''}
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
