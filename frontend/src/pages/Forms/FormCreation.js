import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TemplatePreviewModal from "../../components/TemplatePreviewModal";
import { request } from "../../helpers/axios_helpers";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaInbox, FaFileInvoice, FaArrowRight , FaTimes, FaCheck, FaRandom, FaSyncAlt, FaGripVertical, FaStar } from "react-icons/fa";

const FormCreation = ({formData, setFormData, onNext}) => {
  const navigate = useNavigate();
  const [rearrangeMode, setRearrangeMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [validationError, setValidationError] = useState("");

  const questions = formData.questions;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await request("get", "/api/templates");
      if (response && response.data) setTemplates(response.data);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    }
  };

  const validateBeforeNext = () => {
    if (questions.length === 0) {
      setValidationError("Please add at least one question before proceeding.");
      return false;
    }
  
    const emptyQuestion = questions.find(q => q.text.trim() === "");
    if (emptyQuestion) {
      setValidationError("All questions must be filled. Empty question found.");
      return false;
    }
  
    const minLengthInvalid = questions.find(q => q.text.trim().length < 5);
    if (minLengthInvalid) {
      setValidationError("Each question must be at least 5 characters long.");
      return false;
    }
  
    const texts = questions.map(q => q.text.trim().toLowerCase());
    const hasDuplicate = new Set(texts).size !== texts.length;
    if (hasDuplicate) {
      setValidationError("Duplicate questions found. Please remove or revise them.");
      return false;
    }
  
    setValidationError("");  // Clear error on successful validation
    return true;
  };
  

  const addQuestion = () => {
    setFormData((prev) => ({...prev, questions : [...prev.questions, { text: "", showPoints: false }]}));
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setFormData((prev) => ({...prev, questions : updated}));
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setFormData((prev) => ({...prev, questions : updated}));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setFormData(prev => ({
      ...prev,
      questions: items
    }));
  };

  const handleNext = () => {
    if (validateBeforeNext()) {
      onNext();
    }
  };
  

return (
  <div className="bg-primary-dark min-h-screen pb-10 font-sans rounded-lg">
    {/* Sticky Header */}
    <div className="sticky top-0 z-10 bg-primary-dark py-4 px-6 shadow flex justify-between items-center rounded-lg">
      <h1 className="text-2xl font-bold text-black flex items-center gap-2">
        <FaFileInvoice className="text-orange-400" />
        Add Questions
      </h1>
      <button
        onClick={() => setRearrangeMode(!rearrangeMode)}
        className="bg-accent hover:bg-accent-dark text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2"
      >
        {rearrangeMode ? <FaCheck /> : <FaRandom />}
        {rearrangeMode ? "Done" : "Rearrange Questions"}
      </button>
    </div>

    {/* Template Selector */}
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Saved Question Templates
        </h2>
        <button
          onClick={fetchTemplates}
          className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
        >
          <FaSyncAlt /> Refresh Templates
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="bg-white rounded-lg p-6 text-center text-gray-500 border">
          <FaInbox className="text-4xl mx-auto mb-2" />
          <p className="mb-2 text-lg">No Templates Found</p>
          <p className="text-sm">Create and save templates to view them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedTemplate(template);
                setShowTemplateModal(true);
              }}
              className="bg-white p-4 text-center rounded-xl shadow hover:shadow-md border cursor-pointer hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {template.title}
              </h3>
              <span className="inline-block bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full">
                {template.questions?.length || 0} questions
              </span>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Appraisal Form */}
    <div className="space-y-6 px-6 py-2">
    <h2 className="text-xl font-semibold text-gray-800">
          Current Appraisal Questions 
    </h2>
    {/* Questions Section */}
    {questions.length === 0 ? (
      <div className="bg-white rounded-lg p-6 text-center text-gray-500 border">
        <FaInbox className="text-4xl mx-auto mb-2" />
        <p className="mb-2 text-lg">No Questions Added Yet</p>
        <p className="text-sm">Click below to start adding questions or import from saved templates</p>
      </div>
    ) : rearrangeMode ? (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((q, idx) => (
                <Draggable
                  key={`${q.text}-${idx}`}
                  draggableId={`${q.text}-${idx}`}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white p-4 rounded-lg shadow border mb-4 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                                {idx + 1}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Question
                          </span>
                        </div>
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab text-gray-400 hover:text-gray-600"
                        >
                          <FaGripVertical />
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder={`Question ${idx + 1}`}
                        value={q.text}
                        readOnly                   
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
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
      questions.map((q, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-lg shadow border space-y-4 mb-4"
        >
          <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-white bg-accent rounded-full w-6 h-6 flex items-center justify-center">
              {idx + 1}
          </div>
            <span className="text-sm font-semibold text-gray-700">
              Question
            </span>
          </div>

          <input
            type="text"
            placeholder={`Question ${idx + 1}`}
            value={q.text}
            onChange={(e) => updateQuestion(idx, "text", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-orange-200"
          />

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={q.showPoints}
                onChange={(e) => {
                  updateQuestion(idx, "showPoints", e.target.checked);
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
        </div>
      ))
    )}

    {/* Always Show Add New Question Button */}
    <div
      onClick={addQuestion}
      className="cursor-pointer border-2 border-dashed border-accent bg-white p-4 rounded-lg text-accent text-center font-medium hover:bg-accent hover:text-white transition flex justify-center items-center gap-2"
    >
      <FaPlus />
      Add New Question
    </div>
    
    {validationError && (
      <div className="text-red-600 font-medium text-sm mb-4">
        {validationError}
      </div>
    )}

    {/* Next Button */}
    <div className="w-full flex justify-end">
        <button
          onClick={handleNext}
          className="bg-accent text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          Next: Preview <FaArrowRight />
        </button>
      </div>

    </div>

    {/* Template Preview Modal */}
    {showTemplateModal && selectedTemplate && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/2 shadow-xl relative">
          <button
            onClick={() => setShowTemplateModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>
          <TemplatePreviewModal
            template={selectedTemplate}
            onClose={() => setShowTemplateModal(false)}
            onImport={(importedQuestions) => {
              setFormData(prev => ({
                ...prev,
                questions: importedQuestions.map((q) => ({
                  text: q.text,
                  showPoints: q.showPoints,
                }))
              }));
            }}
          />
        </div>
      </div>
    )}
  </div>
);
 
};

export default FormCreation;
