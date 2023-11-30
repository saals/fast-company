import React from 'react'
import PropTypes from 'prop-types'

const TableHead = ({ columns, onSort, selectedSort }) => {
  const handleSort = (item) => {
    if (selectedSort.path !== item) {
      onSort({ path: item, order: 'asc' })
    } else {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  const renderArrowSort = (currentPath, selectedSort) => {
    if (currentPath === selectedSort.path) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill"></i>
      }
      return <i className="bi bi-caret-up-fill"></i>
    }
    return null
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            scope="col"
            role={columns[column].path && 'button'}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            key={column}
          >
            {columns[column].name}
            {renderArrowSort(columns[column].path, selectedSort)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHead.propTypes = {
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default TableHead
