import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helpers";
import { FaArrowLeft, FaGripVertical } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  const [template, setTemplate] = useState(null);
  const [saved, setSaved] = useState(false);
  const [rearrangeMode, setRearrangeMode] = useState(false);

  const fetchTemplate = async () => {
    try {
      const res = await request("GET", `/api/templates/${id}`);
      setTemplate(res.data);
    } catch (err) {
      console.error("Error loading template", err);
    }
  };

  useEffect(() => {
    fetchTemplate();
  }, [id]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const reordered = Array.from(template.questions);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
  
    const updated = {
      ...template,
      questions: reordered.map((q, i) => ({ ...q, orderIndex: i })),
    };
  
    setTemplate(updated);
    updateTemplate(updated);
  };
  

  const updateTemplate = async (updated) => {
    try {
      await request("PUT", `/api/templates/${id}`, updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error updating template", err);
    }
  };

  const addQuestion = () => {
    const updated = {
      ...template,
      questions: [...template.questions, { text: "", showPoints: false }],
    };
    setTemplate(updated);
    updateTemplate(updated);
  };

  const removeQuestion = (index) => {
    const updated = {
      ...template,
      questions: template.questions.filter((_, i) => i !== index),
    };
    setTemplate(updated);
    updateTemplate(updated);
  };

  const updateQuestion = (index, field, value) => {
    const updated = {
      ...template,
      questions: template.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      ),
    };
    setTemplate(updated);
  };

  const saveAll = () => {
    if (!template.title.trim()) {
      setTemplate((prev) => ({
        ...prev,
        title: `Untitled ${template.id}`,
      }));
    }
    updateTemplate(template);
  };

  if (!template)
    return <p className="text-center mt-10 text-gray-600">Loading template...</p>;

  return (
    <div className="bg-primary min-h-screen pb-10">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-primary py-4 mt-4 px-6 border-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              saveAll();
              navigate("/forms/templates");
            }}
            className="text-sm text-gray-700 flex items-center gap-1 hover:underline"
          >
            <FaArrowLeft /> Back
          </button>
          <input
            ref={titleInputRef}
            placeholder="Enter template title..."
            value={template.title}
            onChange={(e) =>
              setTemplate({ ...template, title: e.target.value })
            }
            onBlur={saveAll}
            className="text-xl font-semibold bg-transparent border-b border-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRearrangeMode(!rearrangeMode)}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark text-sm"
          >
            {rearrangeMode ? "Done Rearranging" : "Rearrange"}
          </button>
          <button
            onClick={() => {
              saveAll();
              navigate("/forms/templates");
            }}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark text-sm"
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {rearrangeMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {template.questions.map((q, idx) => (
                    <Draggable
                      key={`${q.text}-${idx}`}
                      draggableId={`${q.text}-${idx}`}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-primary-dark p-4 rounded shadow-inner border space-y-2 mb-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                                {idx + 1}
                              </div>
                              <span className="text-sm text-gray-600">Question</span>
                            </div>
                            <div {...provided.dragHandleProps} className="cursor-grab text-gray-500 hover:text-gray-800">
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
                            onBlur={saveAll}
                            className="w-full border-b border-gray-400 bg-transparent focus:outline-none placeholder-gray-400 italic"
                          />
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={q.showPoints}
                              onChange={(e) => {
                                updateQuestion(idx, "showPoints", e.target.checked);
                                saveAll();
                              }}
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
            {template.questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-primary-dark p-4 rounded shadow-inner border space-y-2"
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
                  onBlur={saveAll}
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none placeholder-gray-400 italic"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={q.showPoints}
                    onChange={(e) => {
                      updateQuestion(idx, "showPoints", e.target.checked);
                      saveAll();
                    }}
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
            ))}
            {/* Add New Question Panel */}
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
  );
};

export default TemplateEditPage;
