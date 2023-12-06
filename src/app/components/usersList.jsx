import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import api from '../api'
import paginate from '../utils/paginate'

import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import TextField from './textField'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchValue, setSearchValue] = useState('')

  const [users, setUsers] = useState(null)

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }

  const handleCheck = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) user.bookmark = !user.bookmark
        return user
      })
    )
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchValue])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleProfSelect = (item) => {
    if (searchValue) setSearchValue('')
    setSelectedProf(item)
  }

  const handleSearchChange = ({ target }) => {
    setSelectedProf()
    setSearchValue(target.value.trim())
  }

  const handleReset = () => {
    setSelectedProf()
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (!users) {
    return 'Loading...'
  }

  const filteredUsers = searchValue
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users

  const userCount = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const pageSize = 8
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
        <TextField
          placeholder="Search..."
          value={searchValue}
          onFieldChange={handleSearchChange}
        />

        {userCount > 0 && (
          <UsersTable
            users={userCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelete}
            onCheck={handleCheck}
          />
        )}

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

export default UsersList
