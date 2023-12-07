import React from 'react'
import PropTypes from 'prop-types'

import TableBody from './tableBody'
import TableHead from './tableHead'

const Table = ({ columns, data, onSort, selectedSort, children }) => {
  return (
    <table className="table table-striped">
      {children || (
        <>
          <TableHead {...{ columns, onSort, selectedSort }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  children: PropTypes.array
}

export default Table
