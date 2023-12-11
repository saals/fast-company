import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ name, value, onFieldChange, options }) => {
  const handleFieldChange = ({ target }) => {
    onFieldChange({ [name]: target.value })
  }

  return (
    <div className="mb-3">
      {options.map((option) => (
        <div className="form-check form-check-inline" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={handleFieldChange}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  )
}

RadioField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onFieldChange: PropTypes.func,
  options: PropTypes.array
}

export default RadioField
