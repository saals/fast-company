import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  rate,
  completedMeetings,
  profession,
  qualities,
  onDelete,
  bookmark,
  onCheck,
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
  );
};

export default User;
