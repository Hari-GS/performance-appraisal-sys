// EditTemplatesModal.jsx
import React from "react";

const EditTemplatesModel = ({ templates, setTemplates, onClose }) => {
  const updateTemplate = (tIdx, field, value) => {
    const updated = [...templates];
    updated[tIdx][field] = value;
    setTemplates(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-md shadow-lg space-y-4 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-black">Edit Templates</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-xl"
        >
          ×
        </button>

        {templates.map((template, tIdx) => (
          <div key={tIdx} className="bg-gray-50 p-4 rounded border mb-4">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={template.title}
                onChange={(e) =>
                  updateTemplate(tIdx, "title", e.target.value)
                }
                className="text-lg font-semibold border-b border-gray-300 focus:outline-none w-full bg-transparent"
              />
              <button
                onClick={() =>
                  setTemplates(templates.filter((_, i) => i !== tIdx))
                }
                className="text-red-500 text-sm underline ml-4"
              >
                Delete
              </button>
            </div>

            {template.questions.map((q, qIdx) => (
              <div key={qIdx} className="flex items-start gap-2 mb-3">
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => {
                    const updated = [...templates];
                    updated[tIdx].questions[qIdx].text = e.target.value;
                    setTemplates(updated);
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white"
                  placeholder={`Question ${qIdx + 1}`}
                />
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={q.showPoints}
                    onChange={() => {
                      const updated = [...templates];
                      updated[tIdx].questions[qIdx].showPoints =
                        !q.showPoints;
                      setTemplates(updated);
                    }}
                  />
                  Points
                </label>
                <button
                  onClick={() => {
                    const updated = [...templates];
                    updated[tIdx].questions.splice(qIdx, 1);
                    setTemplates(updated);
                  }}
                  className="text-red-400 text-xs underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [...templates];
                updated[tIdx].questions.push({
                  text: "",
                  showPoints: false,
                });
                setTemplates(updated);
              }}
              className="text-sm text-blue-500 underline"
            >
              + Add Question
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setTemplates([
              ...templates,
              {
                title: "New Template",
                questions: [{ text: "", showPoints: false }],
              },
            ])
          }
          className="text-sm text-green-600 underline"
        >
          + Add New Template
        </button>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTemplatesModel;
