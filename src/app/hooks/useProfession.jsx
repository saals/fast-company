import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionService from '../services/professionService'

const ProfessionContext = React.createContext()

export const useProfession = () => useContext(ProfessionContext)

const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessionsList()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const getProfession = (id) => {
    return professions.find((p) => p._id === id)
  }

  return (
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProfessionProvider
