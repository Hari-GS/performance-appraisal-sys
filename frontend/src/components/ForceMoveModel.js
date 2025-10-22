import React from 'react'

function ForceMoveModel({handleForceMove, stageDisplayMap, appraisal, stageOrder,setShowModal }) {

    const currentStageIndex = stageOrder.indexOf(appraisal.stage);
    const nextStage = stageOrder[currentStageIndex + 1] || null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
        <div className="bg-white text-black p-6 rounded-xl shadow-2xl w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4 text-red-600">Are you sure?</h2>
          <p className="mb-3">
            You are about to forcibly move the appraisal from{' '}
            <span className="font-semibold text-blue-700">{stageDisplayMap[appraisal.stage]}</span> to{' '}
            <span className="font-semibold text-green-700">{stageDisplayMap[nextStage]}</span> stage.
          </p>
          <p className="mb-3 text-sm text-gray-700">
            This action will skip any pending submissions or reviews and cannot be undone.
            Please ensure this is necessary before proceeding.
          </p>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleForceMove}
            >
              Confirm & Move
            </button>
          </div>
        </div>
      </div>
    )
}

export default ForceMoveModel
