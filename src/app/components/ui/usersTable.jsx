import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Table from '../common/table'
// import Table, { TableBody, TableHead } from '../common/table'
import Bookmark from '../common/bookmark'
import Qualities from './qualities'
import Profession from './profession'

const UsersTable = ({ users, onSort, selectedSort, onCheck }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark status={user.bookmark} onClick={() => onCheck(user._id)} />
      )
    }
  }

  return (
    // <Table>
    //   <TableHead {...{ columns, onSort, selectedSort }} />
    //   <TableBody {...{ data: users, columns }} />
    // </Table>
    <Table {...{ columns, data: users, onSort, selectedSort }} />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  onCheck: PropTypes.func
}

export default UsersTable
