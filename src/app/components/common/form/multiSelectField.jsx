import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({
  options,
  name,
  onFieldChange,
  defaultValue,
  label
}) => {
  const optionsArr = (
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options)
      : options
  ).map((option) => ({ value: option._id, label: option.name }))

  const handleFieldChange = (value) => {
    onFieldChange({ [name]: value })
  }

  return (
    <div className="mb-3">
      <label>{label}</label>
      {options && (
        <Select
          defaultValue={defaultValue}
          name={name}
          options={optionsArr}
          onChange={handleFieldChange}
          isMulti
          closeMenuOnSelect={false}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      )}
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  onFieldChange: PropTypes.func,
  defaultValue: PropTypes.array,
  label: PropTypes.string
}

export default MultiSelectField
