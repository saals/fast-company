import React from "react";

const Quality = ({ name, color }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default Quality;
