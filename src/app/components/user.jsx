import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import Bookmark from './bookmark'

const User = ({
  _id,
  name,
  rate,
  completedMeetings,
  profession,
  qualities,
  onDelete,
  bookmark,
  onCheck
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <Bookmark status={bookmark} onClick={() => onCheck(_id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired
}

export default User
