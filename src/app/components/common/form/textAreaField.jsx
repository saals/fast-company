import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({
  label,
  // type,
  name,
  value,
  onFieldChange,
  error
  // placeholder
}) => {
  const handleFieldChange = ({ target }) => {
    onFieldChange({ [name]: target.value })
  }

  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={'form-control' + (error ? ' is-invalid' : '')}
          rows="3"
          // placeholder={placeholder}
          // type={'text'}
          id={name}
          name={name}
          value={value}
          onChange={handleFieldChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextAreaField.defaultProps = {
  type: 'text'
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  // type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onFieldChange: PropTypes.func,
  error: PropTypes.string
  // placeholder: PropTypes.string
}

export default TextAreaField
