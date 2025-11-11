// TemplateEditModal.js
import React, { useEffect, useRef, useState } from "react";
import { FaGripVertical, FaCheck  } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoClose } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";


const TemplateEditModel2 = ({
  isOpen,
  onClose,
  employeeName,
  questions,
  onSave,
}) => {
  const [localQuestions, setLocalQuestions] = useState([]);
  const [rearrangeMode, setRearrangeMode] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLocalQuestions(questions || []);
      if (titleInputRef.current) titleInputRef.current.focus();
    }
  }, [isOpen, questions]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(localQuestions);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setLocalQuestions(reordered);
    // onSave(reordered);
  };

  const updateQuestion = (index, field, value) => {
    const updated = localQuestions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setLocalQuestions(updated);
    //onSave(updated);
  };

  const addQuestion = () => {
    const updated = [...localQuestions, { text: "", showPoints: false }];
    setLocalQuestions(updated);
    //onSave(updated);
  };

  const removeQuestion = (index) => {
    const updated = localQuestions.filter((_, i) => i !== index);
    setLocalQuestions(updated);
   // onSave(updated);
  };

  if (!isOpen) return null;

  const handleCleanupAndClose = () => {
    const cleaned = localQuestions
      .filter((q) => q.text.trim() !== "")
      .map((q) => ({ ...q }));
  
    setLocalQuestions(cleaned);
    onSave(cleaned);
    setRearrangeMode(false);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl px-4 pb-4 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 pb-2 pt-4 pl-2">
  <div className="flex justify-between items-center mb-2 border-gray-200">
    <h3 className="text-xl font-semibold">
      Edit Questions for {employeeName}
    </h3>
    <div className="flex gap-2 pr-10">
      <button
        onClick={() => setRearrangeMode((prev) => !prev)}
        className=" border-2 text-sm px-3 py-1 rounded hover:bg-orange-50 flex items-center gap-2 mr-14"
      >
        {rearrangeMode ? (
          <>
            <FaCheck className="text-sm" />
            Done
          </>
        ) : (
          <>
            <FaRandom className="text-sm" />
            Rearrange
          </>
        )}
      </button>
      {rearrangeMode == false ? (
        <button
          onClick={handleCleanupAndClose}
          className="absolute flex items-center top-4 gap-2 right-1 p-0.5 px-2 rounded text-primary bg-accent hover:bg-accent-dark transition"
          title="Close"
        >
          <FaCheck className="text-sm" />
          Done
        </button>
        ) : null
        }
    </div>
  </div>
</div>


        <div className="space-y-6">
          {rearrangeMode ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {localQuestions.map((q, idx) => (
                      <Draggable
                        key={`${q.text}-${idx}`}
                        draggableId={`${q.text}-${idx}`}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="bg-primary p-4 rounded shadow-inner border space-y-2 mb-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                                  {idx + 1}
                                </div>
                                <span className="text-sm text-gray-600">
                                  Question
                                </span>
                              </div>
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab text-gray-500 hover:text-gray-800"
                              >
                                <FaGripVertical />
                              </div>
                            </div>
                            <input
                              type="text"
                              placeholder={`Question ${idx + 1}`}
                              value={q.text}
                              onChange={(e) =>
                                updateQuestion(idx, "text", e.target.value)
                              }
                              className="w-full border-b border-gray-400 bg-transparent focus:outline-none placeholder-gray-400 italic"
                            />
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input
                                type="checkbox"
                                checked={q.showPoints}
                                onChange={(e) =>
                                  updateQuestion(idx, "showPoints", e.target.checked)
                                }
                              />
                              Show Points
                            </label>
                            <button
                              onClick={() => removeQuestion(idx)}
                              className="text-red-500 text-xs hover:underline mt-1"
                            >
                              Remove Question
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <>
              {localQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-primary border-2 p-4 rounded shadow-inner space-y-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-600">Question</span>
                  </div>
                  <input
                    type="text"
                    placeholder={`Question ${idx + 1}`}
                    value={q.text}
                    onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                    className="w-full border-b border-gray-400 bg-transparent focus:outline-none placeholder-gray-400 italic"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={q.showPoints}
                      onChange={(e) =>
                        updateQuestion(idx, "showPoints", e.target.checked)
                      }
                    />
                    Numerical answer only (range: 1-10)
                  </label>
                  <button
                    onClick={() => removeQuestion(idx)}
                    className="text-red-500 text-xs hover:underline mt-1"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
              <div
                onClick={addQuestion}
                className="cursor-pointer border-2 border-dashed border-accent p-4 rounded text-accent text-center hover:bg-accent hover:text-white transition"
              >
                + Add New Question
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditModel2;
