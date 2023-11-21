import React from "react";
import api from "../api";

const users = api.users.fetchAll();

const Users = () => {
  return <h1>{users[0].name}</h1>;
};

export default Users;
