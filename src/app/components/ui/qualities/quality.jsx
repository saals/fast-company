import React from 'react'
import PropTypes from 'prop-types'
import { useQuality } from '../../../hooks/useQuality'

const Quality = ({ id }) => {
  const { getQuality } = useQuality()
  const { name, color } = getQuality(id)

  return <span className={'badge m-1 bg-' + color}>{name}</span>
}

Quality.propTypes = {
  id: PropTypes.string.isRequired
}

export default Quality
