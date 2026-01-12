import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineQuestionCircle } from 'react-icons/ai';
import { request } from '../helpers/axios_helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SelfAppraisalComments = () => {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [scores, setScores] = useState({});
  const { employeeId, appraisalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await request(
        'GET',
        `/api/reporting/self-appraisal/${appraisalId}/participants/${employeeId}/answers`
      );
      const data = response.data || [];

      const initialComments = {};
      const initialScores = {};

      data.forEach((q) => {
        initialComments[q.id] = q.reportingPersonComment || '';
        initialScores[q.id] =
          q.reportingPersonScore !== null && q.reportingPersonScore !== undefined
            ? Number(q.reportingPersonScore)
            : '';
      });

      setQuestions(data);
      setComments(initialComments);
      setScores(initialScores);
    } catch (error) {
      console.error('Failed to fetch self appraisal questions', error);
    }
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleScoreChange = (id, value) => {
    setScores((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const saveComments = async () => {
    try {
      const payload = questions.map((q) => ({
        answerId: q.id,
        reportingPersonComment: comments[q.id] || q.reportingPersonComment || '',
        reportingPersonScore:
          scores[q.id] !== '' && scores[q.id] !== null
            ? Number(scores[q.id])
            : null,
      }));

      await request('PUT', `/api/self-appraisal/reporting-person-comment`, payload);
      toast.success('Comments and scores saved successfully!');
      navigate(`/employee/self-appraisal/comments/${appraisalId}`);
    } catch (error) {
      toast.error("Failed to save comments or scores");
      console.error('Failed to save comments', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between 
                      border-b border-gray-200 px-4 sm:px-6 py-3 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            Manager Review
          </h2>
          <p className="text-sm text-gray-500">
            — Add your comments and scores
          </p>
        </div>
      </div>

      {questions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pb-20 px-4 sm:px-8 pt-8">

          {questions.map((q) => (
            <div key={q.id}
              className="bg-primary rounded border-2 p-4 space-y-4">

              {/* Question Text */}
              <h2 className="text-black text-lg font-semibold flex items-center">
                <AiOutlineQuestionCircle className="mr-2 text-accent" />
                {q.questionText}
              </h2>

              {/* Answer Section */}
              <div className="text-black text-sm">
                <p>
                  <strong>Their Answer:</strong>{' '}
                  {q.answerText || <em>No answer</em>}
                </p>

                {q.answerScore ? (
                  <p className="mt-1">
                    <strong>Their Score:</strong>{' '}
                    <span className="text-accent font-semibold">{q.answerScore}</span> / 10
                  </p>
                ) : (
                  <p className="mt-1 text-gray-500">
                    <em>No self score provided</em>
                  </p>
                )}
              </div>

              {/* Score Buttons */}
              <div>
                <p className="text-sm font-semibold mb-1 text-gray-700">
                  Your Score:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleScoreChange(q.id, num)}
                      className={`px-3 py-1 rounded-full border transition-all 
                        ${
                          Number(scores[q.id]) === num
                            ? 'bg-accent text-white border-accent'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Box */}
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-accent"
                rows={3}
                value={comments[q.id] || ''}
                onChange={(e) => handleCommentChange(q.id, e.target.value)}
                placeholder="Add your comment..."
              />
            </div>
          ))}

        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          This participant has not answered any self-appraisal questions.
        </p>
      )}

      {/* Save Button */}
      {questions.length > 0 && (
        <button
          onClick={saveComments}
          className="fixed bottom-6 right-6 bg-accent text-white font-semibold 
                     px-4 py-2 rounded hover:bg-accent-dark transition"
        >
          Save Comments & Scores
        </button>
      )}
    </div>
  );
};

export default SelfAppraisalComments;
