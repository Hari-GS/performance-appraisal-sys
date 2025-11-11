import React from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="text-sm font-medium text-gray-800 px-4 py-2 rounded hover:bg-orange-50 border-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-accent text-white text-sm font-medium px-5 py-2 rounded hover:bg-accent-dark"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
