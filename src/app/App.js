import React, { useEffect, useState } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

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
      {users && (
        <Users users={users} onDelete={handleDelete} onCheck={handleCheck} />
      )}
    </>
  )
}

export default App
