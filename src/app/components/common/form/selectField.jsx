import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  name,
  value,
  onFieldChange,
  options: dataOptions,
  label,
  error
}) => {
  const options =
    !Array.isArray(dataOptions) && typeof dataOptions === 'object'
      ? Object.values(dataOptions)
      : dataOptions

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        className={'form-select' + (error ? ' is-invalid' : '')}
        name={name}
        value={value}
        onChange={onFieldChange}
      >
        <option disabled value="">
          Выбрать...
        </option>
        {options &&
          options.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onFieldChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  error: PropTypes.string
}

export default SelectField
