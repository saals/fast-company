import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, onFieldChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onFieldChange}
      />
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
  onFieldChange: PropTypes.func
}

export default TextField
