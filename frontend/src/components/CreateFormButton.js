import React from "react";
import { useNavigate } from "react-router-dom";

const CreateFormButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/forms");
  };

  return (
    <button
      onClick={handleClick}
      className="w-[83%] bg-secondary hover:bg-[#012b6e] text-white font-semibold py-10 px-6 ml-14 rounded-2xl shadow-md flex justify-between items-center"
    >
      <span className="text-lg">Create form</span>
      <span className="text-2xl">›</span> {/* Right Arrow Icon */}
    </button>
  );
};

export default CreateFormButton;
