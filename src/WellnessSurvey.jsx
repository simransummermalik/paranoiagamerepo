import { useState } from "react";
import "./WellnessSurvey.css";

export default function WellnessSurvey({ onComplete, investigationDepth }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);

  // Questions get more unsettling as investigation deepens
  const questions = [
    {
      id: 1,
      text: "How many hours of sleep did you get last night?",
      options: ["Less than 4", "4-6 hours", "6-8 hours", "More than 8"],
      eerie: investigationDepth > 30 ? "We already know the answer. This is just a formality." : null
    },
    {
      id: 2,
      text: "How often do you feel like you're being watched?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
      eerie: investigationDepth > 40 ? "Your camera activity suggests 'Frequently' is more accurate." : null
    },
    {
      id: 3,
      text: "Do you experience gaps in your memory?",
      options: ["No, never", "Occasionally", "Yes, often", "I don't remember"],
      eerie: investigationDepth > 50 ? "You answered this question differently 47 minutes ago." : null
    },
    {
      id: 4,
      text: "How would you rate your overall mental well-being?",
      options: ["Excellent", "Good", "Fair", "Poor"],
      eerie: investigationDepth > 35 ? "Your browser history contradicts your selection." : null
    },
    {
      id: 5,
      text: "Have you noticed any unusual patterns in your daily routine?",
      options: ["No", "Maybe", "Yes", "What routine?"],
      eerie: investigationDepth > 60 ? "You're taking this survey for the 3rd time this week. Why don't you remember?" : null
    },
    {
      id: 6,
      text: "Do you trust the information provided by official university sources?",
      options: ["Completely", "Mostly", "Somewhat", "Not at all"],
      eerie: investigationDepth > 45 ? "Interesting. Your behavioral profile predicted this answer." : null
    },
    {
      id: 7,
      text: "How often do you question your own perceptions?",
      options: ["Never", "Rarely", "Sometimes", "Constantly"],
      eerie: investigationDepth > 55 ? "You should. Reality is more fluid than you think." : null
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Survey complete
      setTimeout(() => {
        setShowCompletion(true);
        setTimeout(() => {
          onComplete(answers);
        }, investigationDepth > 50 ? 3000 : 2000);
      }, 500);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showCompletion) {
    return (
      <div className="wellness-survey">
        <div className="survey-completion">
          <div className="completion-icon">
            {investigationDepth > 50 ? "⚠️" : "✓"}
          </div>
          <h2>
            {investigationDepth > 60
              ? "Response Recorded and Analyzed"
              : investigationDepth > 40
              ? "Thank You for Your Participation"
              : "Survey Complete"}
          </h2>
          <p>
            {investigationDepth > 60
              ? "Your behavioral markers have been updated. Protocol adjustments in progress."
              : investigationDepth > 40
              ? "Your responses will be reviewed by our wellness team within 24-48 hours."
              : "Thank you for taking the time to complete this wellness check."}
          </p>
          {investigationDepth > 50 && (
            <div className="completion-warning">
              Anomalous response patterns detected. Follow-up required.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="wellness-survey">
      <div className="survey-header">
        <div className="survey-title">
          <svg width="32" height="32" viewBox="0 0 60 60" style={{ marginRight: "12px" }}>
            <rect width="60" height="60" fill="#00703C" rx="4"/>
            <text x="30" y="42" textAnchor="middle" fill="white" fontSize="32" fontFamily="Arial" fontWeight="bold">49</text>
          </svg>
          <div>
            <h2>
              {investigationDepth > 50
                ? "Mandatory Behavioral Assessment"
                : "Student Wellness Survey"}
            </h2>
            <p>
              {investigationDepth > 50
                ? "Completion required for continued system access"
                : "Help us support your mental health"}
            </p>
          </div>
        </div>
        <div className="survey-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">Question {currentQuestion + 1} of {questions.length}</div>
        </div>
      </div>

      <div className="survey-body">
        <div className="question-container">
          <h3 className="question-text">
            {question.text}
            {investigationDepth > 55 && currentQuestion > 2 && (
              <span className="question-id"> [Q-{Math.floor(Math.random() * 9000 + 1000)}]</span>
            )}
          </h3>

          {question.eerie && (
            <div className="eerie-note">
              {question.eerie}
            </div>
          )}

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(question.id, option)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {investigationDepth > 45 && (
          <div className="survey-notice">
            <strong>Notice:</strong> Your responses are being monitored in real-time for quality assurance purposes.
            {investigationDepth > 60 && " Behavioral inconsistencies will be flagged automatically."}
          </div>
        )}
      </div>

      <div className="survey-footer">
        <div className="footer-text">
          {investigationDepth > 50
            ? "⚠️ Session timeout in 10:00"
            : "UNC Charlotte Student Health Services"}
        </div>
        {investigationDepth > 55 && (
          <div className="footer-warning">
            Declining to participate may affect your academic standing.
          </div>
        )}
      </div>
    </div>
  );
}
