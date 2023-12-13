import React from 'react'
import { useParams } from 'react-router-dom'

import UserPage from '../components/pages/userPage'
import UsersListPage from '../components/pages/usersListPage'
import EditUserPage from '../components/pages/editUserPage'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users
