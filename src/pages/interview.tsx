import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Interview: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(4);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/interview", {
        topic: selectedTopic,
        numQuestions: parseInt(numQuestions.toString()),
      });

      const generatedQuestions = response.data.questions;
      console.log(
        "Received questions:",
        generatedQuestions.length,
        generatedQuestions
      );
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setIsInterviewStarted(true);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      toast.error("Failed to generate interview questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isInterviewStarted ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Interview Preparation</h1>

          <div className="mb-4">
            <label className="block mb-2">Topic:</label>
            <input
              type="text"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. React, Node.js, Data Structures"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Number of Questions:</label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={4}>4 Questions</option>
              <option value={7}>7 Questions</option>
              <option value={10}>10 Questions</option>
            </select>
          </div>

          <button
            onClick={handleStartInterview}
            disabled={!selectedTopic || isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Start Interview"}
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-gray-800 text-lg">
              {questions[currentQuestionIndex]}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() =>
                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  setIsInterviewStarted(false);
                  toast.success("Interview completed!");
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
