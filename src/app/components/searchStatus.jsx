import React from "react";

const SearchStatus = ({ length }) => {
  const sayPhrase = (number) => {
    if (number > 4 && number < 21) return "человек тусанут";
    if (["2", "3", "4"].includes(number.toString().slice(-1)))
      return "человека тусанут";
    return "человек тусанет";
  };

  return (
    <h2>
      <span className={"badge bg-" + (length > 0 ? "primary" : "warning")}>
        {length !== 0
          ? `${length} ${sayPhrase(length)} с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};

export default SearchStatus;
