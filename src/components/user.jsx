import React from "react";

const getQualitiesBadges = (qualities) => {
  return qualities.map((quality) => (
    <span key={quality._id} className={"badge m-1 bg-" + quality.color}>
      {quality.name}
    </span>
  ));
};

const User = ({
  _id,
  name,
  rate,
  completedMeetings,
  profession,
  qualities,
  handleDelete,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{getQualitiesBadges(qualities)}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
