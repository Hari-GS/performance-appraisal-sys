import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSpinner,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";
import { request } from "../helpers/axios_helpers";
import { toast } from "react-toastify";

const QUESTIONS_PER_PAGE = 5;

const SelfAppraisal = ({ currentAppraisal }) => {
  const { appraisalId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [textAnswers, setTextAnswers] = useState({});
  const [scoreAnswers, setScoreAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const appraisal = currentAppraisal;

  // ✅ Fetch questions and saved answers
  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        setLoading(true);

        const [questionsRes, answersRes] = await Promise.all([
          request("GET", `/api/self-appraisal/${appraisalId}/questions`),
          request("GET", `/api/self-appraisal/${appraisalId}/answers`),
        ]);

        // savedAnswers: { questionId: { answerText, answerScore } }
        const savedAnswers = {};
        answersRes.data.forEach((ans) => {
          savedAnswers[ans.questionId] = {
            answerText: ans.answerText || "",
            // ✅ Convert to number if not null
            answerScore:
              ans.answerScore !== null && ans.answerScore !== undefined
                ? Number(ans.answerScore)
                : "",
          };
        });

        const initialTextAnswers = {};
        const initialScoreAnswers = {};

        questionsRes.data.forEach((q) => {
          initialTextAnswers[q.id] = savedAnswers[q.id]?.answerText || "";
          initialScoreAnswers[q.id] = savedAnswers[q.id]?.answerScore || "";
        });

        setQuestions(questionsRes.data);
        setTextAnswers(initialTextAnswers);
        setScoreAnswers(initialScoreAnswers);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions or answers.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndAnswers();
  }, [appraisalId]);

  const handleTextChange = (questionId, value) => {
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleScoreChange = (questionId, value) => {
    setScoreAnswers((prev) => ({
      ...prev,
      [questionId]: value, // keep as number
    }));
  };

  const handleSubmit = async (appraisal) => {
    try {
      setSubmitting(true);

      const answersArray = questions.map((q) => ({
        questionId: q.id,
        answerText: textAnswers[q.id],
        // ✅ Convert empty string to null for backend Integer
        answerScore:
          scoreAnswers[q.id] === "" ? null : Number(scoreAnswers[q.id]),
      }));

      await request(
        "POST",
        `/api/self-appraisal/${appraisalId}/submit`,
        answersArray
      );

      toast.success("Your answers were saved successfully!");
      navigate(`/employee/appraisal/${appraisalId}`, { state: { appraisal } });
    } catch (err) {
      toast.error("Unexpected error: couldn't save answers");
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
    <div className="relative max-w-4xl p-4">
      {/* Info Note */}
      {currentPage === 1 && (
        <div className="mb-8 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md text-sm flex items-center gap-2">
          <FaInfoCircle className="text-yellow-600" />
          <span>
            Saving with blank text fields will be treated as no answers. You can
            exit the appraisal and return later to complete it.
          </span>
        </div>
      )}

      {paginatedQuestions.map((q, index) => {
        const isAnswered =
          textAnswers[q.id]?.trim() !== "" && scoreAnswers[q.id] !== "";

        return (
          <div key={q.id} className="mb-6 p-4 border-2 rounded bg-primary">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`question-${q.id}`}
                className="font-semibold text-gray-800"
              >
                {index + 1 + (currentPage - 1) * QUESTIONS_PER_PAGE}. {q.text}
              </label>
              {isAnswered && <FaCheckCircle className="text-green-500 ml-2" />}
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handleScoreChange(q.id, num)} // ✅ pass number directly
                  className={`px-4 py-2 rounded-full border transition ${
                    scoreAnswers[q.id] === num
                      ? "bg-accent text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <textarea
              id={`question-${q.id}`}
              value={textAnswers[q.id] || ""}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
              className="border rounded px-3 py-2 w-full mt-3 bg-gray-50"
              rows="3"
              placeholder="Type your answer..."
            />
          </div>
        );
      })}

      {/* Pagination + Save */}
      <div className="sticky bottom-0 bg-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-3 py-1 text-base border-2 rounded disabled:opacity-50 hover:bg-orange-50"
          >
            <FaArrowLeft /> Previous
          </button>
          <p className="text-sm text-gray-700">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-3 py-1 text-base border-2 rounded disabled:opacity-50 hover:bg-orange-50"
          >
            Next <FaArrowRight />
          </button>
        </div>

        <button
          className="flex items-center justify-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded hover:bg-accent-dark transition-all duration-300"
          disabled={submitting}
          onClick={() => handleSubmit(appraisal)}
        >
          {submitting && <FaSpinner className="animate-spin" />}
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SelfAppraisal;
