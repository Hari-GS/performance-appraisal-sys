import React, { useEffect, useState } from "react";
import profilePic from "../../images/profile-placeholder.jpg";
import { BsCircleFill } from "react-icons/bs";
import { request } from "../../helpers/axios_helpers";
import { useNavigate } from "react-router-dom";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await request("GET", "/api/forms/profiles");
        setReviews(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleClick = () => {
    navigate("/forms");
  };

  return (
    <div className="flex flex-col flex-1 p-6 pt-12">
      {/* Top Buttons */}
      <div className="flex flex-row justify-between">
        <div className="border flex flex-row space-x-4 px-4 rounded-lg w-fit">
          <button className="bg-orange-500 text-white rounded-lg px-4 my-4 w-[180px]">Reviews</button>
          <button className="bg-gray-200 rounded-lg px-4 my-4 w-[180px]">Responses</button>
          {/* Search Bar */}
          <div className="mt-4 flex items-center pl-4 pb-4">
            <input type="text" placeholder="Search..." className="border p-2 rounded-lg w-[380px]" />
          </div>
        </div>
        <button
          className="bg-orange-500 rounded-full px-4 my-3 text-white hover:bg-orange-600 shadow-inner"
          style={{ boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.2)" }}
          onClick={handleClick}
        >
          + Create New
        </button>
      </div>

      {/* Reviews Table */}
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 px-4">Reviewee</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Created By</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No data to display
                </td>
              </tr>
            ) : (
              reviews.map((item, index) => (
                <tr key={index} className="bg-white shadow-md py-1 my-2">
                  <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <img src={profilePic} alt="User" className="w-8 h-8 rounded-full" />
                      <span>{item.reviewee}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`flex items-center justify-center gap-2 px-0 py-1 rounded-md font-medium ${
                        item.submitted
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      <BsCircleFill
                        className={`w-3 h-3 ${
                          item.submitted ? "text-green-500" : "text-yellow-500"
                        }`}
                      />
                      {item.submitted ? "All Submitted" : "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">{item.createdBy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewSection;
