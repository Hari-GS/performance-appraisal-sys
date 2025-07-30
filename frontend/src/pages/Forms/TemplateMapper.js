import React, { useEffect, useState } from "react";
import { request } from "../../helpers/axios_helpers";
import { FiEdit } from "react-icons/fi";
import TemplateEditModel2 from "./TemplateEditModel2";

const TemplateMapper = ({ formData, setFormData, onNext  }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await request("get", "/api/templates");
        setTemplates(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch templates", error);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateChange = async (employeeId, selectedTemplateIdStr) => {
    if (!selectedTemplateIdStr) {
      // Clear template and questions
      setFormData((prev) => ({
        ...prev,
        participants: prev.participants.map((p) =>
          p.employeeId === employeeId
            ? { ...p, templateId: null, questions: [] }
            : p
        ),
      }));
      return;
    }

    const selectedTemplateId = parseInt(selectedTemplateIdStr);
    try {
      const res = await request("get", `/api/templates/${selectedTemplateId}`);
      const questions = res.data.questions;

      setFormData((prev) => ({
        ...prev,
        participants: prev.participants.map((p) =>
          p.employeeId === employeeId
            ? { ...p, templateId: selectedTemplateId, questions }
            : p
        ),
      }));
    } catch (err) {
      console.error("Failed to fetch template questions:", err);
    }
  };

  const handleEditClick = (employeeId) => {
    setEditingEmployeeId(employeeId);
  };

  const handleSaveEditedQuestions = (employeeId, updatedQuestions) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.map((p) =>
        p.employeeId === employeeId ? { ...p, questions: updatedQuestions } : p
      ),
    }));
    setEditingEmployeeId(null);
  };

  if (loading) return <div>Loading templates...</div>;

  return (
    <div className="space-y-4 mt-6">
      {formData.participants.map((emp) => (
        <div
          key={emp.employeeId}
          className="border p-4 rounded-lg shadow-sm bg-primary-dark"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.designation}</p>
            </div>
            <div className="flex gap-3 items-center">
              <select
                className="border px-2 py-1 rounded"
                value={emp.templateId?.toString() || ""}
                onChange={(e) =>
                  handleTemplateChange(emp.employeeId, e.target.value)
                }
              >
                <option value="">Select Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.title}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleEditClick(emp.employeeId)}
                disabled={!emp.questions?.length}
                className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm ${
                  emp.questions?.length
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <FiEdit />
                Edit
              </button>
            </div>
          </div>

          {/* Display questions as a preview */}
          <ul className="list-disc pl-6 text-sm text-gray-600">
            {emp.questions?.map((q, index) => (
              <li key={index}>{q.text}</li>
            ))}
          </ul>

          {/* Edit Modal */}
          {editingEmployeeId === emp.employeeId && (
            <TemplateEditModel2
              isOpen={true}
              onClose={() => setEditingEmployeeId(null)}
              employeeName={emp.employeeName}
              questions={emp.questions}
              onSave={(updatedQuestions) =>
                handleSaveEditedQuestions(emp.employeeId, updatedQuestions)
              }
            />
          )}
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark transition"
        >
          Next: Preview
        </button>
      </div>

    </div>
  );
};

export default TemplateMapper;
