import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Interview {
  _id: string;
  domain: string;
  type: string;
  date: string;
  score: number;
  performance: {
    confidence: number;
    technicalCorrectness: number;
    communicationSkills: number;
    relevance: number;
    fluency: number;
  };
}

interface UserData {
  _id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    location.state?.message || null
  );

  useEffect(() => {
    // Load user data from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData(user);
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, []);

  useEffect(() => {
    // Clear success message after 5 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await axios.get(
          "http://localhost:5000/api/interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterviews(response.data);
      } catch (err: any) {
        console.error("Failed to fetch interviews:", err);
        setError(
          err.response?.data?.message || "Failed to load interview data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/");
  };

  // Calculate average score from all interviews
  const averageScore =
    interviews.length > 0
      ? Math.round(
          interviews.reduce((sum, interview) => sum + interview.score, 0) /
            interviews.length
        )
      : 0;

  // Find highest score
  const highestScore =
    interviews.length > 0
      ? Math.max(...interviews.map((interview) => interview.score))
      : 0;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Top header with user info and logout */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mr-3">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-medium">{userData?.name || "User"}</p>
            <p className="text-sm text-gray-500">{userData?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 px-4 py-2 rounded border border-red-200 hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Link
          to="/interview-setup"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Interview
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Interviews</h2>
          <p className="text-3xl font-bold text-primary">
            {loading ? "..." : interviews.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Average Score</h2>
          <p className="text-3xl font-bold text-green-600">
            {loading ? "..." : `${averageScore}%`}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Highest Score</h2>
          <p className="text-3xl font-bold text-blue-600">
            {loading ? "..." : `${highestScore}%`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold p-6 border-b">
          Interview History
        </h2>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading interview history...
          </div>
        ) : interviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            You haven't completed any interviews yet.
            <Link
              to="/interview-setup"
              className="text-primary hover:underline ml-2"
            >
              Start your first interview
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <tr key={interview._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(interview.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {interview.domain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          interview.score >= 80
                            ? "text-green-600"
                            : interview.score >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {interview.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/results/${interview._id}`}
                        className="text-primary hover:text-blue-800"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
