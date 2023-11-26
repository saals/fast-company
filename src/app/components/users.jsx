import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import User from './user'
import Pagination from './pagination'
import paginate from '../utils/paginate'

import api from '../api/'
import GroupList from './groupList'
import SearchStatus from './searchStatus'

const Users = ({ users: allUsers, ...rest }) => {
  const tableTitles = [
    'Имя',
    'Качества',
    'Профессия',
    'Встретился,раз',
    'Оценка',
    'Избранное'
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleProfSelect = (item) => {
    setSelectedProf(item)
  }

  const handleReset = () => {
    setSelectedProf()
  }

  const pageSize = 2

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers

  const userCount = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  return (
    <>
      {professions && (
        <>
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={handleReset}>
            Reset
          </button>
        </>
      )}

      <SearchStatus length={userCount} />
      {userCount > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                {tableTitles.map((title) => (
                  <th key={title} scope="col">
                    {title}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={userCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
