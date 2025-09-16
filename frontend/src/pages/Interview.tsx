import React from "react";
import { Link } from "react-router-dom";

const Interview: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Interview in Progress</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Question</h2>
        <p className="mb-6">
          Tell me about a challenging project you worked on recently and how you
          overcame obstacles.
        </p>
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <p>Your answer will appear here as you speak...</p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/interview-setup"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </Link>
          <Link
            to="/results/1"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Complete Interview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Interview;
