import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Table from '../common/table'
// import Table, { TableBody, TableHead } from '../common/table'
import Bookmark from '../common/bookmark'
import Qualities from './qualities'

const UsersTable = ({ users, onSort, selectedSort, onDelete, onCheck }) => {
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
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark status={user.bookmark} onClick={() => onCheck(user._id)} />
      )
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
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
  onDelete: PropTypes.func,
  onCheck: PropTypes.func
}

export default UsersTable
