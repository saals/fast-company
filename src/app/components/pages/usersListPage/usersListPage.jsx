import React, { useEffect, useState } from 'react'
import _ from 'lodash'

// import api from '../../../api'
import paginate from '../../../utils/paginate'

import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import { useUser } from '../../../hooks/useUser'
import { useProfession } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchValue, setSearchValue] = useState('')

  const { users } = useUser()
  const { professions, isLoading: professionsLoading } = useProfession()
  const { currentUser } = useAuth()

  const handleDelete = (id) => {
    // setUsers(users.filter((user) => user._id !== id))
    console.log(id)
  }

  const handleCheck = (id) => {
    // setUsers(
    //   users.map((user) => {
    //     if (user._id === id) user.bookmark = !user.bookmark
    //     return user
    //   })
    // )
    console.log(id)
  }

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

  // if (!users) {
  //   return 'Loading...'
  // }
  function filterUser(data) {
    const filteredUsers = searchValue
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data
    return filteredUsers.filter((u) => u._id !== currentUser._id)
  }

  const filteredUsers = filterUser(users)
  const userCount = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const pageSize = 8
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  return (
    <div className="d-flex mt-3">
      {professions && !professionsLoading && (
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
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
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

export default UsersListPage
