import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = ({ name, value, onFieldChange, children, error }) => {
  const handleFieldChange = () => {
    onFieldChange({ [name]: !value })
  }

  return (
    <div className="form-check mb-3">
      <input
        className={'form-check-input' + (error ? ' is-invalid' : '')}
        type="checkbox"
        // value=""
        id={name}
        checked={value}
        onChange={handleFieldChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

CheckboxField.propTypes = {
  name: PropTypes.string,
  onFieldChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  value: PropTypes.bool,
  error: PropTypes.string
}

export default CheckboxField
