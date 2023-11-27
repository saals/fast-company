import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
  items,
  selectedItem,
  onItemSelect,
  valueProperty,
  contentProperty
}) => {
  const correctedItems = Array.isArray(items) ? items : Object.values(items)
  return (
    <ul className="list-group">
      {correctedItems.map((item) => (
        <li
          className={
            'list-group-item' + (item === selectedItem ? ' active' : '')
          }
          role="button"
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired
}

export default GroupList
