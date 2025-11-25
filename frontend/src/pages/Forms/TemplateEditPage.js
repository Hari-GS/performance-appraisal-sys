import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helpers";
import { FaGripVertical } from "react-icons/fa";
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
    <div className="bg-primary pb-10">

      {/* ----------------------------------- */}
      {/*      FIXED RESPONSIVE HEADER        */}
      {/* ----------------------------------- */}
      <div className="sticky top-0  bg-primary py-4 px-4 sm:px-6 border-gray-300 
                      flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        {/* Title & Input Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">

          <p className="text-lg text-gray-700 whitespace-nowrap">Template Name :</p>

          {template.isDefault ? (
            <p className="text-xl font-semibold text-gray-900 break-words">
              {template.title}
            </p>
          ) : (
            <input
              ref={titleInputRef}
              placeholder="Enter template title..."
              value={template.title}
              onChange={(e) => setTemplate({ ...template, title: e.target.value })}
              onBlur={saveAll}
              className="text-xl font-semibold bg-transparent border-b border-gray-400 focus:outline-none w-full sm:w-auto"
            />
          )}
        </div>

        {/* Buttons */}
        {!template.isDefault && (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setRearrangeMode(!rearrangeMode)}
              className="px-4 py-2 rounded hover:bg-orange-50 border-2 text-sm"
            >
              {rearrangeMode ? "Done Rearranging" : "Rearrange"}
            </button>

            <button
              onClick={() => {
                saveAll();
                navigate("/forms/templates");
              }}
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark text-sm"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* ----------------------------------- */}
      {/*      CONTENT WRAPPER (MOBILE FIX)   */}
      {/* ----------------------------------- */}
      <div className="space-y-6 p-4 sm:p-6">

        {rearrangeMode && !template.isDefault ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {template.questions.map((q, idx) => (
                    <Draggable key={`${q.text}-${idx}`} draggableId={`${q.text}-${idx}`} index={idx}>
                      {(provided) => (
                        <div
                          className="bg-primary shadow-[0_0_8px_rgba(0,0,0,0.15)] p-4 rounded border-2 space-y-2 mb-4"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
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
                            onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                            onBlur={saveAll}
                            className="w-full border-b border-gray-400 bg-transparent focus:outline-none"
                          />

                          <button
                            onClick={() => removeQuestion(idx)}
                            className="text-red-500 text-xs hover:underline mt-3"
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
                className="bg-primary shadow-[0_0_8px_rgba(0,0,0,0.15)] p-4 rounded border-2 space-y-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-gray-600">Question</span>
                </div>

                {template.isDefault ? (
                  <p className="text-gray-800">{q.text}</p>
                ) : (
                  <input
                    type="text"
                    placeholder={`Question ${idx + 1}`}
                    value={q.text}
                    onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                    onBlur={saveAll}
                    className="w-full border-b border-gray-400 bg-transparent focus:outline-none"
                  />
                )}

                {!template.isDefault && (
                  <button
                    onClick={() => removeQuestion(idx)}
                    className="text-red-500 text-xs hover:underline mt-3"
                  >
                    Remove Question
                  </button>
                )}
              </div>
            ))}

            {!template.isDefault && (
              <div
                onClick={addQuestion}
                className="cursor-pointer border-2 border-dashed border-accent p-4 rounded text-accent text-center hover:bg-accent hover:text-white transition"
              >
                + Add New Question
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateEditPage;
