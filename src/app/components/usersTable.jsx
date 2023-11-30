import React from 'react'
import PropTypes from 'prop-types'

import Table from './table'
// import TableHead from './tableHead'
// import TableBody from './tableBody'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'

const UsersTable = ({ users, onSort, selectedSort, onDelete, onCheck }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
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
