import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

const Users = ({ users, ...rest }) => {
  const tableTitles = [
    "Имя",
    "Качества",
    "Профессия",
    "Встретился,раз",
    "Оценка",
    "Избранное",
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const userCount = users.length;
  const pageSize = 4;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    userCount > 0 && (
      <>
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
            {userCrop.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={userCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    )
  );
};

export default Users;
