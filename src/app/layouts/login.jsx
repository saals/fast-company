import React, { useState } from 'react'
import TextField from '../components/textField'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })

  const handleFieldChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onFieldChange={handleFieldChange}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={data.password}
        onFieldChange={handleFieldChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login
