import React, { useEffect, useState } from "react";
import { request } from "../../helpers/axios_helpers"; // adjust the import based on your file structure

const ReviewSection = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request("GET", "/api/forms/titles")
      .then((res) => {
        setForms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forms:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading forms...</p>;

  return (
    <div className="p-6 pt-10 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button className="bg-orange-400 px-4 py-2 text-white rounded mr-2">All</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Archived</button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-2 rounded w-64"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded">+ Create Form</button>
        </div>
      </div>

      {forms.map((form, index) => (
        <div
          key={index}
          className="bg-white rounded shadow p-4 flex justify-between items-center mb-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span role="img" aria-label="form-icon">📝</span>
              <span className="font-bold text-lg">{form.title}</span>
            </div>
            <div className="text-sm text-gray-600">
              updated {form.updatedDate}, {form.owner}
            </div>
          </div>
          <div className="flex items-center gap-12 text-center">
            <div>
              <div className="font-semibold">Reviews</div>
              <div>{form.reviewsCount}</div>
            </div>
            <div>
              <div className="font-semibold">Responses</div>
              <div>
                {form.responsesReceived} out of {form.totalResponses}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
