import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
  items,
  selectedItem,
  onItemSelect,
  valueProperty,
  contentProperty
}) => {
  if (!Array.isArray(items)) {
    return (
      <ul className="list-group">
        {Object.keys(items).map((item) => (
          <li
            className={
              'list-group-item' +
              (items[item] === selectedItem ? ' active' : '')
            }
            role="button"
            onClick={() => onItemSelect(items[item])}
            key={items[item][valueProperty]}
          >
            {items[item][contentProperty]}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className="list-group">
      {items.map((item) => (
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
