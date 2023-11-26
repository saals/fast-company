import React, { useState } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }

  const handleCheck = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) user.bookmark = !user.bookmark
        return user
      })
    )
  }

  return (
    <>
      <Users users={users} onDelete={handleDelete} onCheck={handleCheck} />
    </>
  )
}

export default App
