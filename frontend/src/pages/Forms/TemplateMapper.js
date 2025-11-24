import React, { useEffect, useState } from "react";
import { request } from "../../helpers/axios_helpers";
import { FiEdit } from "react-icons/fi";
import TemplateEditModel2 from "./TemplateEditModel2";
import { FaArrowRight } from "react-icons/fa";

const TemplateMapper = ({ formData, setFormData, onNext }) => {
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
          className="border-2 p-4 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] bg-primary"
        >
          {/* === TOP SECTION === */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-2">

            {/* Left – name + designation */}
            <div>
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.designation}</p>
            </div>

            {/* Right – select + edit (responsive stack on mobile) */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

              <select
                className="border px-2 py-2 rounded w-full sm:w-auto"
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
                className={`flex items-center gap-1 px-3 py-2 rounded text-white border text-sm w-full sm:w-auto
                  ${
                    emp.questions?.length
                      ? "bg-accent hover:bg-accent-dark"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                <FiEdit />
                Edit
              </button>
            </div>
          </div>

          {/* === QUESTIONS PREVIEW === */}
          <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
            {emp.questions?.map((q, index) => (
              <li key={index}>{q.text}</li>
            ))}
          </ul>

          {/* EDIT MODAL */}
          {editingEmployeeId === emp.employeeId && (
            <TemplateEditModel2
              isOpen={true}
              onClose={() => setEditingEmployeeId(null)}
              employeeName={emp.name}
              questions={emp.questions}
              onSave={(updatedQuestions) =>
                handleSaveEditedQuestions(emp.employeeId, updatedQuestions)
              }
            />
          )}
        </div>
      ))}

      {/* NEXT BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-accent text-white flex items-center px-6 py-2 rounded hover:bg-accent-dark transition gap-2"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TemplateMapper;
