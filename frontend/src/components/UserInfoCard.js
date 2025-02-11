import React from "react";

const UserInfoCard = ({ name, role }) => {
  return (
    <div className="p-14 flex items-center">
      {/* User Info */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">Hi, {name}</h2>
        <p className="text-sm pt-2 text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
