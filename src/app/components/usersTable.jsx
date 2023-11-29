import React from 'react'
import PropTypes from 'prop-types'

import User from './user'

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
  const columns = {
    name: { iter: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    profession: { iter: 'profession.name', name: 'Профессия' },
    completedMeetings: { iter: 'completedMeetings', name: 'Встретился, раз' },
    rate: { iter: 'rate', name: 'Оценка' },
    bookmark: { iter: 'bookmark', name: 'Избранное' },
    delete: {}
  }

  const handleSort = (item) => {
    if (selectedSort.iter !== item) {
      onSort({ iter: item, order: 'asc' })
    } else {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  const renderArrowSort = (currentIter, selectedSort) => {
    if (currentIter === selectedSort.iter) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill"></i>
      }
      return <i className="bi bi-caret-up-fill"></i>
    }
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {Object.keys(columns).map((column) => (
            <th
              scope="col"
              role={columns[column].iter && 'button'}
              onClick={
                columns[column].iter
                  ? () => handleSort(columns[column].iter)
                  : undefined
              }
              key={column}
            >
              {columns[column].name}
              {renderArrowSort(columns[column].iter, selectedSort)}
            </th>
          ))}
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
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
