import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { request } from "../helpers/axios_helpers";

const QUESTIONS_PER_PAGE = 5;

const SelfAppraisal = ({ currentAppraisal }) => {
  const { appraisalId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // ✅ added answers state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const appraisal = currentAppraisal;

  // Fetch questions and saved answers
  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        setLoading(true);

        const questionsRes = await request(
          "GET",
          `/api/self-appraisal/${appraisalId}/questions`
        );

        const answersRes = await request(
          "GET",
          `/api/self-appraisal/${appraisalId}/answers`
        );

        // Map saved answers to object { questionId: answerText }
        const savedAnswers = {};
        answersRes.data.forEach((ans) => {
          savedAnswers[ans.questionId] = ans.answerText;
        });

        // Fill unanswered ones with empty string
        const initialAnswers = {};
        questionsRes.data.forEach((q) => {
          initialAnswers[q.id] = savedAnswers[q.id] || "";
        });

        setQuestions(questionsRes.data);
        setAnswers(initialAnswers); // ✅ now stored in state
      } catch (err) {
        console.error(err);
        setError("Failed to load questions or answers.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndAnswers();
  }, [appraisalId]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (appraisal) => {
    try {
      setSubmitting(true);

      const answersArray = Object.entries(answers).map(([id, text]) => ({
        questionId: Number(id),
        answerText: text,
      }));

      await request(
        "POST",
        `/api/self-appraisal/${appraisalId}/submit`,
        answersArray
      );

      alert("Appraisal submitted successfully!");
      navigate(`/employee/appraisal/${appraisalId}`, { state: { appraisal } });
    } catch (err) {
      alert("Failed to submit appraisal.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-2xl" />
        <span className="ml-2">Loading questions...</span>
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl p-4 mt-14 relative">
      <h2 className="text-xl font-bold mb-4">Self Appraisal</h2>

      {paginatedQuestions.map((q, index) => {
        const isAnswered =
          q.showPoints === true
            ? answers[q.id] !== ""
            : (answers[q.id] || "").trim() !== "";

        return (
          <div
            key={q.id}
            className="mb-6 p-4 border rounded-2xl shadow-sm bg-primary-dark"
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`question-${q.id}`}
                className="font-semibold text-gray-800"
              >
                {index + 1 + (currentPage - 1) * QUESTIONS_PER_PAGE}. {q.text}
              </label>
              {isAnswered && <FaCheckCircle className="text-green-500 ml-2" />}
            </div>

            {q.showPoints === true ? (
              <div className="flex gap-2 mt-3 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleChange(q.id, String(num))} // ✅ store as string to match backend
                    className={`px-4 py-2 rounded-full border transition ${
                      answers[q.id] === String(num)
                        ? "bg-accent text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                id={`question-${q.id}`}
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="border rounded px-3 py-2 w-full mt-3"
                rows="3"
                placeholder="Type your answer..."
                required
              />
            )}
          </div>
        );
      })}

      {/* Pagination + Save */}
      <div className="sticky bottom-0 bg-white p-3 border-t flex justify-between items-center">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

        <button
          className="bg-accent text-white px-4 py-2 rounded-lg flex items-center justify-center"
          disabled={submitting}
          onClick={() => handleSubmit(appraisal)}
        >
          {submitting && <FaSpinner className="animate-spin mr-2" />}
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SelfAppraisal;
