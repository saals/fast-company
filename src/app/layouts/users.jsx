import React from 'react'
import { useParams } from 'react-router-dom'

import UserPage from '../components/pages/userPage'
import UsersListPage from '../components/pages/usersListPage'
import EditUserPage from '../components/pages/editUserPage'
import UserProvider from '../hooks/useUser'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <UserProvider>
      {userId ? (
        edit ? (
          <EditUserPage userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UserProvider>
  )
}

export default Users
