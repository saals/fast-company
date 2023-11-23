import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const tableTitles = [
    "Имя",
    "Качества",
    "Профессия",
    "Встретился,раз",
    "Оценка",
    "Избранное",
  ];

  return (
    users.length > 0 && (
      <table className="table table-striped">
        <thead>
          <tr>
            {tableTitles.map((title) => (
              <th key={title} scope="col">
                {title}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} {...user} {...rest} />
          ))}
        </tbody>
      </table>
    )
  );
};

export default Users;
