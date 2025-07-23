import React, { useEffect, useState } from "react";
import { FaStar, FaPlus, FaTrash } from "react-icons/fa";
import { request } from "../../helpers/axios_helpers";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
    try {
      const response = await request("GET", "/api/templates");
      setTemplates(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const addNewTemplate = async () => {
    const newTemplate = {
      title: "New Template",
      questions: [],
    };
    try {
      const response = await request("POST", "/api/templates", newTemplate);
      setTemplates([...templates, response.data]);
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  const updateTemplate = async (updatedTemplate) => {
    try {
      await request("PUT", `/api/templates/${updatedTemplate.id}`, updatedTemplate);
      fetchTemplates(); // Optional: for consistency with backend state
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await request("DELETE", `/api/templates/${id}`);
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleInputChange = (templateIdx, questionIdx, field, value) => {
    const updatedTemplates = [...templates];
    updatedTemplates[templateIdx].questions[questionIdx][field] = value;
    setTemplates(updatedTemplates);
  };

  const addQuestion = (templateIdx) => {
    const updatedTemplates = [...templates];
    updatedTemplates[templateIdx].questions.push({ text: "", showPoints: false });
    setTemplates(updatedTemplates);
  };

  const removeQuestion = (templateIdx, questionIdx) => {
    const updatedTemplates = [...templates];
    updatedTemplates[templateIdx].questions.splice(questionIdx, 1);
    setTemplates(updatedTemplates);
  };

  const renameTemplate = (templateIdx, newTitle) => {
    const updatedTemplates = [...templates];
    updatedTemplates[templateIdx].title = newTitle;
    setTemplates(updatedTemplates);
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading templates...</p>;

  return (
    <div className="bg-blue-100 min-h-screen p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Templates Management</h1>
        <button
          onClick={addNewTemplate}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
          disabled={loading}
        >
          <FaPlus /> Add New Template
        </button>
      </div>

      {templates.length === 0 && (
        <p className="text-center text-gray-600">No templates found. Add one to get started.</p>
      )}

      {templates.map((template, tIdx) => (
        <div
          key={template.id}
          className="bg-white p-6 rounded shadow-inner border space-y-4"
        >
          {/* Template Title */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={template.title}
              onChange={(e) => renameTemplate(tIdx, e.target.value)}
              onBlur={() => updateTemplate(templates[tIdx])}
              className="text-lg font-semibold border-b border-gray-300 bg-transparent focus:outline-none"
            />
            <button
              onClick={() => deleteTemplate(template.id)}
              className="text-red-500 text-sm flex items-center gap-1 hover:underline"
            >
              <FaTrash /> Delete
            </button>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {template.questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="bg-gray-50 p-4 rounded flex items-start justify-between gap-4"
              >
                <input
                  type="text"
                  placeholder={`Question ${qIdx + 1}`}
                  value={q.text}
                  onChange={(e) =>
                    handleInputChange(tIdx, qIdx, "text", e.target.value)
                  }
                  onBlur={() => updateTemplate(templates[tIdx])}
                  className="flex-1 border-b border-gray-400 bg-transparent py-1 focus:outline-none"
                />
                <div className="flex items-center gap-4">
                  <label className="text-sm flex items-center gap-1 text-gray-600">
                    <input
                      type="checkbox"
                      checked={q.showPoints}
                      onChange={(e) => {
                        handleInputChange(tIdx, qIdx, "showPoints", e.target.checked);
                        updateTemplate(templates[tIdx]);
                      }}
                    />
                    Points
                  </label>
                  <button
                    onClick={() => removeQuestion(tIdx, qIdx)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question */}
          <div className="flex justify-end">
            <button
              onClick={() => addQuestion(tIdx)}
              className="text-sm text-blue-500 underline hover:text-blue-700"
            >
              + Add Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
