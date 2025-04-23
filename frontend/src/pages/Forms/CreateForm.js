import { useState } from "react";
import { FiEdit2, FiMoreVertical } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HRFormBuilderPage() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const [welcomeError, setWelcomeError] = useState("");
  const [questionError, setQuestionError] = useState("");


  const handleNext = () => {
    let valid = true;
  
    if (!welcomeMessage.trim()) {
      setWelcomeError("Welcome message is required.");
      valid = false;
    } else {
      setWelcomeError("");
    }
  
    if (questions.length === 0 || questions.every(q => q.text.trim() === "")) {
      setQuestionError("At least one valid question is required.");
      valid = false;
    } else {
      setQuestionError("");
    }
  
    if (!valid) return;
  
    const formData = {
      title: formTitle,
      welcomeMessage,
      questions,
    };
    navigate("/forms/participants", { state: formData });
  };
  

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", enableStars: false },
    ]);
  };

  const addQuestionWithStars = () => {
    setQuestions([
      ...questions,
      { text: "", enableStars: true },
    ]);
  };

  const updateQuestionText = (index, newText) => {
    const updated = [...questions];
    updated[index].text = newText;
    setQuestions(updated);
  };

  const toggleStars = (index) => {
    const updated = [...questions];
    updated[index].enableStars = !updated[index].enableStars;
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen p-6 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          <button className="bg-orange-400 text-white px-4 py-2 rounded">Question</button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded">Participants</button>
        </div>
        <button
          onClick={handleNext}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium"
        >
          Next
        </button>
        </div>
        <div className="flex items-center gap-2 mt-8">
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="text-2xl font-semibold bg-transparent border-b-2 border-orange-500 focus:outline-none"
          />
          <FiEdit2 size={20} className="text-gray-500" />
        </div>

      {/* Main Section */}
      <div className="mt-6 border rounded-lg border-orange-200 shadow-md p-4 bg-white">
        <h3 className="text-orange-500 font-semibold mb-4">Questions for Review</h3>

        {/* Welcome Message */}
        <div className="mb-4">
          <label className="font-bold text-gray-700">Welcome Message</label>
          <input
            placeholder="Add a message that user will see on the welcome screen"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            className="w-full mt-1 px-3 py-2 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          {welcomeError && <p className="text-red-500 text-sm mt-1">{welcomeError}</p>}
        </div>
        


        {/* Questions */}
        {questions.map((q, index) => (
          <div key={index} className="relative rounded mb-4 p-3">
            <div className="flex justify-between items-start">
              <input
                placeholder="Type a question here..."
                value={q.text}
                onChange={(e) => updateQuestionText(index, e.target.value)}
                className="w-full mb-2 px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-transparent"
              />

              <div className="relative">
                <button onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}>
                  <FiMoreVertical />
                </button>

                {activeDropdown === index && (
                  <div className="absolute right-0 top-6 bg-white border shadow-md rounded z-10 w-48 p-2 text-sm">
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-orange-100 rounded"
                      onClick={() => {
                        toggleStars(index);
                        setActiveDropdown(null);
                      }}
                    >
                      {q.enableStars ? "Disable Star Rating" : "Enable Star Rating"}
                    </button>
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-orange-100 rounded text-red-600"
                      onClick={() => deleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stars Placeholder */}
            {q.enableStars && (
              <div className="flex items-center gap-2 mt-2 opacity-60 pointer-events-none">
                <span className="text-sm font-medium">Star Points:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} size={20} className="text-gray-400" />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Add Question Buttons */}
        <div className="flex justify-left mt-4 gap-4">
          <button
            onClick={addQuestion}
            className="bg-white px-4 py-2 border rounded shadow"
          >
            Add Question
          </button>
          <button
            onClick={addQuestionWithStars}
            className="bg-white px-4 py-2 border rounded shadow"
          >
            Add Question with Stars
          </button>
        </div>
        {questionError && <p className="text-red-500 text-sm mt-2">{questionError}</p>}
      </div>
    </div>
  );
}
