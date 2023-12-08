import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((prev) => (prev === 'login' ? 'register' : 'login'))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
            </>
          ) : (
            <>
              <h3 className="mb-4">Войти</h3>
              <LoginForm />
            </>
          )}
          <p className="mt-3">
            <span className="me-2">или перейти на страницу</span>
            <a
              className="badge bg-info fs-6"
              role="button"
              onClick={toggleFormType}
            >
              {formType === 'register' ? 'Войти' : 'Регистрация'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
