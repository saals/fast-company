import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../api'
import QualitiesList from './qualitiesList'

const User = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setUser(user)
    })
  })

  const history = useHistory()
  const handleClick = () => {
    history.push('/users')
  }

  if (!user) return 'Loading'

  return (
    <>
      <h1>{user.name}</h1>
      <h3>Профессия: {user.profession.name}</h3>
      <p>{<QualitiesList qualities={user.qualities} />}</p>
      <p>Количество встреч: {user.completedMeetings}</p>
      <h2>Рейтинг: {user.rate} / 5</h2>
      <button className="btn btn-warning" type="button" onClick={handleClick}>
        Все пользователи
      </button>
    </>
  )
}

User.propTypes = {
  userId: PropTypes.string.isRequired
}

export default User