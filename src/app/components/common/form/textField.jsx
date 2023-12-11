import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label,
  type,
  name,
  value,
  onFieldChange,
  error,
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleFieldChange = ({ target }) => {
    onFieldChange({ [name]: target.value })
  }

  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={'form-control' + (error ? ' is-invalid' : '')}
          placeholder={placeholder}
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleFieldChange}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onFieldChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

export default TextField
