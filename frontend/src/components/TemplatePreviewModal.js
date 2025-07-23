import React from "react";
import { FaTimes } from "react-icons/fa";

const TemplatePreviewModal = ({ template, onClose, onImport }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          {template.title} <span className="font-normal">– Questions Preview</span>
        </h3>

        {/* Questions List */}
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
          {template.questions.map((q, i) => (
            <div
              key={i}
              className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm border hover:bg-gray-100 transition"
            >
              <span className="font-medium">Q{i + 1}.</span> {q.text}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onImport(template.questions);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Import Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
