import React from "react";

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {status ? "Published" : "Draft"}
    </span>
  );
};

export default StatusBadge;
