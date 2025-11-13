import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineQuestionCircle } from 'react-icons/ai';
import { request } from '../helpers/axios_helpers';
import { useNavigate, useParams } from 'react-router-dom';

const SelfAppraisalComments = () => {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
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
      setQuestions(response.data || []);
    } catch (error) {
      console.error('Failed to fetch self appraisal questions', error);
    }
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const saveComments = async () => {
    try {
      const payload = questions.map((q) => ({
        answerId: q.id,
        reportingPersonComment: comments[q.id] || q.reportingPersonComment,
      }));
      await request('PUT', `/api/self-appraisal/reporting-person-comment`, payload);
      alert('Comments saved successfully!');
      navigate(`/employee/self-appraisal/comments/${appraisalId}`)
    } catch (error) {
      console.error('Failed to save comments', error);
    }
  };

  return (
    <div className=" p-6 min-h-screen bg-primary">
      {questions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pb-20">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-primary-dark rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-black text-lg font-semibold mb-2 flex items-center">
                <AiOutlineQuestionCircle className="mr-2 text-accent" />
                {q.questionText}
              </h2>

              <p className="text-black text-sm mb-4">
                <strong>Answer:</strong> {q.answerText}
              </p>

              <div className="flex items-start">
                <AiOutlineComment className="mr-2 mt-1 text-accent" />
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Add your comment..."
                  rows={3}
                  value={comments[q.id] || q.reportingPersonComment || ''}
                  onChange={(e) => handleCommentChange(q.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          This participant not answered any of his/her self appraisal questions
        </p>
      )}

      {questions.length > 0 && (
        <button
          onClick={saveComments}
          className="fixed bottom-6 right-6 bg-accent text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-accent-dark transition duration-300"
        >
          Save Comments
        </button>
      )}
    </div>
  );
};

export default SelfAppraisalComments;
