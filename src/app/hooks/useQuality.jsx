import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/qualityService'

const QualityContext = React.createContext()

export const useQuality = () => {
  return useContext(QualityContext)
}

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.fetchAll()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id)
  }

  return (
    <QualityContext.Provider value={{ isLoading, getQuality, qualities }}>
      {children}
    </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default QualityProvider
