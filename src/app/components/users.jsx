import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Pagination from './pagination'
import paginate from '../utils/paginate'

import api from '../api/'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 2

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

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession._id === selectedProf._id) // JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    : allUsers

  const userCount = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  return (
    <div className="d-flex mt-3">
      {professions && (
        <div className="d-flex flex-column p-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}

      <div className="d-flex flex-column flex-shrink-0">
        <SearchStatus length={userCount} />

        {userCount > 0 && <UsersTable users={userCrop} {...rest} />}

        <div className="d-flex justify-content-center">
          <Pagination
            itemCount={userCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
