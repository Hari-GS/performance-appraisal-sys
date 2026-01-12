// TemplateEditModal.js
import React, { useEffect, useRef, useState } from "react";
import { FaGripVertical, FaCheck } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  };

  const updateQuestion = (index, field, value) => {
    const updated = localQuestions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setLocalQuestions(updated);
  };

  const addQuestion = () => {
    const updated = [...localQuestions, { text: "", showPoints: false }];
    setLocalQuestions(updated);
  };

  const removeQuestion = (index) => {
    setLocalQuestions(localQuestions.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const handleCleanupAndClose = () => {
    const cleaned = localQuestions
      .filter((q) => q.text.trim() !== "")
      .map((q) => ({ ...q }));

    onSave(cleaned);
    setRearrangeMode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">

        {/* HEADER — FIXED FOR MOBILE */}
        <div className="
          sticky top-0 bg-white z-10 pt-4 pb-3 px-3
          flex flex-col gap-3 
          sm:flex-row sm:items-center sm:justify-between
        ">
          {/* Title */}
          <h3 className="
            text-lg sm:text-xl font-semibold 
            break-words
          ">
            Edit Questions for {employeeName}
          </h3>

          {/* Right Buttons */}
          <div className="
            flex gap-2 
            sm:flex-row 
            justify-end
          ">
            <button
              onClick={() => setRearrangeMode((prev) => !prev)}
              className="
                border-2 text-sm px-3 py-1 rounded 
                hover:bg-orange-50 flex items-center gap-2
              "
            >
              {rearrangeMode ? (
                <>
                  <FaCheck className="text-sm" /> Done
                </>
              ) : (
                <>
                  <FaRandom className="text-sm" /> Rearrange
                </>
              )}
            </button>

            {!rearrangeMode && (
              <button
                onClick={handleCleanupAndClose}
                className="
                  bg-accent text-white px-3 py-1 rounded 
                  hover:bg-accent-dark text-sm flex items-center gap-2
                "
              >
                <FaCheck className="text-sm" /> Done
              </button>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="space-y-6 p-4">
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
                            className="bg-primary p-4 rounded border shadow-sm space-y-2 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
                              className="
                                w-full border-b border-gray-400 bg-transparent 
                                focus:outline-none placeholder-gray-400 italic
                              "
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
                              className="text-red-500 text-xs hover:underline"
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
                  className="bg-primary border p-4 rounded shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-600">Question</span>
                  </div>

                  <input
                    type="text"
                    placeholder={`Question ${idx + 1}`}
                    value={q.text}
                    onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                    className="
                      w-full border-b border-gray-400 bg-transparent 
                      focus:outline-none placeholder-gray-400 italic
                    "
                  />

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={q.showPoints}
                      onChange={(e) =>
                        updateQuestion(idx, "showPoints", e.target.checked)
                      }
                    />
                    Numerical answer only (range: 1–10)
                  </label>

                  <button
                    onClick={() => removeQuestion(idx)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              <div
                onClick={addQuestion}
                className="
                  cursor-pointer border-2 border-dashed border-accent 
                  p-4 rounded text-accent text-center 
                  hover:bg-accent hover:text-white transition
                "
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
