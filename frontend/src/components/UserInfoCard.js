import React from "react";

const UserInfoCard = () => {
  // const { user } = useAuth();

  return (
    <div className="p-14 flex items-center">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">
          {/* Hi, {user?.username || "Guest"} */}
        </h2>
      </div>
    </div>
  );
};

export default UserInfoCard;
