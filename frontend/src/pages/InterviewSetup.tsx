import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const InterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("mid");
  const [duration, setDuration] = useState("30");
  const [questionCount, setQuestionCount] = useState("4");
  const [skills, setSkills] = useState<string[]>(["React", "JavaScript"]);
  const [customSkill, setCustomSkill] = useState("");

  const allSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "HTML/CSS",
    "Redux",
    "Next.js",
    "GraphQL",
    "REST APIs",
    "Testing",
  ];

  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill && !skills.includes(customSkill)) {
      setSkills([...skills, customSkill]);
      setCustomSkill("");
    }
  };

  const startInterview = (e: React.FormEvent) => {
    e.preventDefault();

    // Create settings object to pass to the interview page
    const settings = {
      position,
      experience,
      duration,
      skills,
      questionCount,
    };

    // Navigate to interview page with settings
    navigate("/interview/in-progress", { state: { settings } });
  };

  // Filter out custom skills that aren't in the predefined list
  const customSkills = skills.filter((skill) => !allSkills.includes(skill));

  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <form
        onSubmit={startInterview}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Setup Your Interview
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position/Role
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Frontend Developer, React Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="junior">Junior (0-2 years)</option>
            <option value="mid">Mid-level (3-5 years)</option>
            <option value="senior">Senior (6+ years)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="4"
                checked={questionCount === "4"}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="form-radio h-5 w-5 text-primary"
              />
              <span className="ml-2">4 Questions</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="7"
                checked={questionCount === "7"}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="form-radio h-5 w-5 text-primary"
              />
              <span className="ml-2">7 Questions</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="10"
                checked={questionCount === "10"}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="form-radio h-5 w-5 text-primary"
              />
              <span className="ml-2">10 Questions</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills to Focus On
          </label>

          <div className="flex flex-wrap gap-2 mb-4">
            {allSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm ${
                  skills.includes(skill)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Display custom skills */}
          {customSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="w-full text-sm text-gray-600 mb-1">
                Custom Skills:
              </div>
              {customSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className="px-3 py-1 rounded-full text-sm bg-green-500 text-white"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}

          <div className="flex">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add custom skill"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={addCustomSkill}
              className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            &larr; Back to Dashboard
          </Link>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={!position || skills.length === 0}
          >
            Start Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewSetup;
