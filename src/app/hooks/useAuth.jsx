import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../services/userService'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [currentUser, setUser] = useState({})

  function setTokens({ idToken, refreshToken, expiresIn = 3600 }) {
    const expiresDate = Date.now() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
  }

  async function signUp({ email, password, ...rest }) {
    const key = 'AIzaSyCFQWVkJiwLTcA_iw763wbO2lpzuHUk2SI'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      createUser({ _id: data.localId, email, ...rest })
      console.log(data)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function createUser(data) {
    try {
      // const { content } = await userService.create(data)
      // setUser(content)
      // console.log(content)
      await userService.create(data)
      setUser(data)
      console.log(data)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
