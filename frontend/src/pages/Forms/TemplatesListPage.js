import React, { useEffect, useState } from "react";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helpers";

const TemplatesListPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();

  const fetchTemplates = async () => {
    try {
      const res = await request("GET", "/api/templates");
      setTemplates(res.data);
    } catch (err) {
      console.error("Error fetching templates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const deleteTemplate = async () => {
    try {
      await request("DELETE", `/api/templates/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchTemplates();
    } catch (err) {
      console.error("Error deleting template", err);
    }
  };

  const addNewTemplate = async () => {
    // Collect existing "Untitled" numbers
    const untitledNumbers = templates
      .map(t => t.title)
      .filter(title => title.startsWith("Untitled"))
      .map(title => {
        const match = title.match(/^Untitled(?: (\d+))?$/);
        return match ? parseInt(match[1] || "1", 10) : null;
      })
      .filter(n => n !== null);
  
    // Find the next available number
    const nextNumber = untitledNumbers.length > 0
      ? Math.max(...untitledNumbers) + 1
      : 1;
  
    const newTitle = `Untitled ${nextNumber}`;
  
    try {
      const res = await request("POST", "/api/templates", {
        title: newTitle,
        questions: [{ text: "", showPoints: false }],
      });
      navigate(`/forms/templates/${res.data.id}`);
    } catch (err) {
      console.error("Error creating new template", err);
    }
  };
  
  

  return (
        <div className="bg-primary space-y-6">
          {/* Header Section */}
          {/* Header Section */}
    <div className="
        flex flex-col sm:flex-row 
        sm:items-center sm:justify-between 
        border-b border-gray-200 
        px-4 sm:px-6 py-2 gap-2
    ">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <h2 className="text-base font-semibold text-gray-800">
          Templates
        </h2>
        <p className="text-sm text-gray-500">
          — Different self appraisal question templates for different designations
        </p>
      </div>

      {/* Right Section - stays same visually */}
      <button
        onClick={addNewTemplate}
        className="
            rounded-md px-3 py-1 
            hover:bg-orange-50 
            flex items-center justify-center 
            border-2 gap-2 text-accent
            w-full sm:w-auto
        "
      >
        <FaPlus />
        <p className="text-black">New Template</p>
      </button>
    </div>

     <div className="px-4 sm:px-8 py-0 overflow-x-hidden">
  {loading ? (
    <p className="text-center text-gray-600">Loading templates...</p>
  ) : templates.length === 0 ? (
    <p className="text-center text-gray-500">No templates found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 w-full overflow-x-hidden">
      {templates.map((template) => (
        <div
          key={template.id}
          className="
            p-4 rounded border-2 
            transition-all duration-150 
            flex justify-between items-center
            w-full
          "
        >
          <div className="w-full">
            <h2 className="font-semibold text-black break-words">
              {template.title || "Untitled"}
            </h2>
            <p className="text-sm text-gray-500">
              {template.questions?.length || 0} questions
            </p>
          </div>

          <div className="flex gap-4 text-sm">
            <button
              onClick={() => navigate(`/forms/templates/${template.id}`)}
              className="text-blue-600 flex items-center gap-1 hover:underline"
              title="Open Template"
            >
              Open
            </button>

            {!template.isDefault && (
              <button
                onClick={() => confirmDelete(template.id)}
                className="text-red-500 flex items-center gap-1 hover:underline"
                title="Delete Template"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

       {/* Delete Confirmation Modal */}
       {confirmDeleteId && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded shadow-xl p-6 w-11/12 sm:w-[400px] text-center space-y-4">
            <h2 className="text-lg font-semibold text-black">Delete Template?</h2>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded hover:bg-orange-50 border-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={deleteTemplate}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesListPage;
