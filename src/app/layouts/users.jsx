import React from 'react'
import { useParams } from 'react-router-dom'

import UsersList from '../components/usersList'
import User from '../components/user'

const Users = () => {
  const { userId } = useParams()

  return <>{userId ? <User userId={userId} /> : <UsersList />}</>
}

export default Users
