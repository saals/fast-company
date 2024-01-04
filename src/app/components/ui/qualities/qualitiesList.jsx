import React from 'react'
import PropTypes from 'prop-types'

import Quality from './quality'
import { useQuality } from '../../../hooks/useQuality'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality()

  if (isLoading) return 'loading...'

  return qualities.map((quality) => <Quality key={quality} id={quality} />)
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default QualitiesList
