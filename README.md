<<<<<<< HEAD
# AI Interview Practice Platform

A full-stack web application that allows students to practice interviews using AI. The platform simulates real interview conditions by integrating video, voice, and AI analysis to provide a comprehensive evaluation of the student's performance.

## Features

- **Authentication**: User signup and login functionality with secure session management
- **Dashboard**: View past interviews and start new ones
- **Interview Setup**: Choose domain and interview type
- **Interview Interface**: Answer questions via voice with webcam recording
- **AI Feedback**: Analysis of speech, grammar, facial expressions, and technical correctness
- **Results Page**: Detailed feedback with charts and improvement suggestions

## Tech Stack

- **Frontend**: React.js with TypeScript and Tailwind CSS
- **Backend**: Node.js and Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Voice Input**: Web Speech API
- **Video Recording**: react-webcam
- **Charts**: Chart.js with react-chartjs-2

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file based on the provided `.env.example` file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## Usage

1. Register a new account or login with existing credentials
2. From the dashboard, click "Start New Interview"
3. Select domain and interview type
4. Answer questions using your microphone
5. Review your results and feedback

## Sample Users

For testing purposes, you can use these accounts:

- Email: user@example.com
- Password: password123

## Note on AI Integration

The current implementation uses mock AI services for demonstration purposes. In a production environment, you would integrate with:

- Speech Recognition API (like Google's Speech-to-Text or OpenAI's Whisper)
- Computer Vision API for facial expression analysis
- NLP service for analyzing responses

## License

MIT
=======
# Smart-Mock-Interview
Smart Mock Interview is an AI-powered platform that helps users improve interview skills through realistic simulations. It uses video, voice, facial analysis, speech-to-text, and NLP feedback. Built with React.js, it offers personalized dashboards, domain-based questions, and detailed performance reports.
>>>>>>> 53e3a81663e02aceae0e9822f50577114b447f59
