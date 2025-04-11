import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../helpers/axios_helpers";

const UserInfoCard = () => {
  const user = getUser() // ✅ Get firstName

  return (
    <div className="p-14 flex items-center">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">
          Hi, {user.firstName || "Guest"}
        </h2>
      </div>
    </div>
  );
};

export default UserInfoCard;
