import React from "react";
import profilePic from "../images/profile-placeholder.jpg";
import { BsCircleFill } from "react-icons/bs";

const ReviewSection = () => {
  return (
    <div className="flex flex-col flex-1 p-6 pt-12">
      {/* Top Buttons */}
      <div className="flex flex-row justify-between">
        <div className="border flex flex-row space-x-4 px-4 rounded-lg w-fit">
          <button className="bg-orange-500 text-white rounded-lg px-4 my-4 w-[180px]">All Reviews</button>
          <button className="bg-gray-200 rounded-lg px-4 my-4 w-[180px]">My Responses</button>
          {/* Search Bar */}
          <div className="mt-4 flex items-center pl-4 pb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-lg w-[380px]"
            />
          </div>
        </div>
        <button
          className="bg-orange-500 rounded-full px-4 my-3 text-white hover:bg-orange-600 shadow-inner"
          style={{ boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.2)" }}
        >
          + Create New
        </button>

      </div>

      {/* Tabs */}
      <div className="pl-4">
        <button className="bg-orange-500 text-white rounded-lg py-2 my-4 w-[180px]">All Reviews</button>
        <button className="bg-gray-200 rounded-lg ml-4 py-2 w-[180px]">Awaiting Responses</button>
        <button className="bg-gray-200 rounded-lg ml-4 py-2 w-[180px]">Completed</button>
      </div>

      {/* Reviews Table */}
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 px-4">Reviewee</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Submitted</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Created By</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Lingeswaran.R",
                title: "Project Title",
                email: "Lingesh@gmail.com",
                status: "Pending",
                borderColor: "border-yellow-500",
                dotColor:"text-yellow-500",
                createdBy: "Saranya",
              },
              {
                name: "Lingeswaran.R",
                title: "Project Title",
                email: "Lingesh@gmail.com",
                status: "Submitted",
                borderColor: "border-green-500",
                dotColor:"text-green-500",
                createdBy: "Saranya",
              },
            ].map((item, index) => (
              <tr key={index} className="bg-white shadow-md py-1 my-2">
              <td className="py-2 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <img src={profilePic} alt="User" className="w-8 h-8 rounded-full" />
                  <span>{item.name}</span>
                </div>
              </td>


                <td className="py-2 px-4 text-center">{item.title}</td>
                <td className="py-2 px-4 text-center">{item.email}</td>
                <td className="py-2 px-4 text-center flex items-center justify-center">
                  <span className={`flex items-center justify-center border px-2 py-0 rounded-md ${item.borderColor} text-black w-[110px]`}>
                    <BsCircleFill className={`w-3 h-3 mr-2 ${item.dotColor}`} />
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">{item.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewSection;
