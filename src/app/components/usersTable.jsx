import React from 'react'
import PropTypes from 'prop-types'

import User from './user'

const UsersTable = ({ users, ...rest }) => {
  const columns = [
    'Имя',
    'Качества',
    'Профессия',
    'Встретился, раз',
    'Оценка',
    'Избранное'
  ]

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...user} {...rest} />
        ))}
      </tbody>
    </table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}

export default UsersTable
