import React, { useState } from "react";
import api from "../api";
import User from "./user";

const Users = () => {
  const tableTitles = [
    "Имя",
    "Качества",
    "Профессия",
    "Встретился,раз",
    "Оценка",
  ];

  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const sayPhrase = (number) => {
    if (number > 4 && number < 21) return "человек тусанут";
    if (["2", "3", "4"].includes(number.toString().slice(-1)))
      return "человека тусанут";
    return "человек тусанет";
  };

  return (
    <>
      <span
        className={"badge bg-" + (users.length > 0 ? "primary" : "warning")}
      >
        {users.length !== 0
          ? `${users.length} ${sayPhrase(users.length)} с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>

      {users.length > 0 && (
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
              <User key={user._id} {...user} handleDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
