import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InterviewResults: React.FC = () => {
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");

  // Mock interview results
  const mockResults = {
    score: 87,
    duration: "28:45",
    skills: [
      "React",
      "TypeScript",
      "State Management",
      "Performance Optimization",
    ],
    position: "Senior Frontend Developer",
    feedback: {
      strengths: [
        "Strong understanding of React hooks and component lifecycle",
        "Excellent knowledge of performance optimization techniques",
        "Good problem-solving approach and communication skills",
      ],
      areasForImprovement: [
        "Could improve understanding of more advanced TypeScript concepts",
        "Consider exploring more state management libraries beyond Redux",
      ],
      questionFeedback: [
        {
          question:
            "Can you explain the difference between useState and useRef hooks in React?",
          score: 92,
          feedback:
            "Provided a comprehensive explanation covering all key differences with practical examples",
        },
        {
          question:
            "How would you optimize performance in a React application that renders a large list of items?",
          score: 85,
          feedback:
            "Good understanding of virtualization and memoization, but could have mentioned windowing libraries",
        },
        {
          question:
            "Describe your approach to testing React components. What tools and methodologies do you use?",
          score: 78,
          feedback:
            "Covered basic testing concepts but missed some important testing strategies for complex components",
        },
        {
          question:
            "Can you explain how you would implement client-side form validation in React?",
          score: 90,
          feedback:
            "Excellent understanding of form validation approaches and libraries",
        },
      ],
    },
  };

  // Calculate score class based on score range
  const getScoreClass = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 75) return "text-blue-600 bg-blue-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const handleDeleteMockInterview = () => {
    setDeleteLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setDeleteLoading(false);
      // Navigate to dashboard with success message
      navigate("/dashboard", {
        state: { message: "Interview deleted successfully" },
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-6">Interview Results</h1>

          {/* Summary section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Overall Score
              </h3>
              <div className="flex items-end">
                <span
                  className={`text-3xl font-bold px-2 py-1 rounded ${getScoreClass(
                    mockResults.score
                  )}`}
                >
                  {mockResults.score}%
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Position
              </h3>
              <p className="text-lg font-medium">{mockResults.position}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Duration
              </h3>
              <p className="text-lg font-medium">{mockResults.duration}</p>
            </div>
          </div>

          {/* Skills section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Skills Assessed</h2>
            <div className="flex flex-wrap gap-2">
              {mockResults.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Feedback section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Interview Feedback</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-green-700 mb-2">
                Strengths
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {mockResults.feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-700 mb-2">
                Areas for Improvement
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {mockResults.feedback.areasForImprovement.map((area, index) => (
                  <li key={index} className="text-gray-700">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question-by-question feedback */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Question-by-Question Analysis
            </h2>
            <div className="space-y-4">
              {mockResults.feedback.questionFeedback.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-md font-medium pr-4">
                      Q{index + 1}: {item.question}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${getScoreClass(
                        item.score
                      )}`}
                    >
                      {item.score}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Dashboard
          </button>

          <div className="flex gap-3">
            {showDeleteConfirm ? (
              <>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMockInterview}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Confirm Delete"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/interview/setup")}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Start New Interview
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete Interview
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;
