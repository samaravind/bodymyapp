"use client";

import { useState } from "react";

type QuestionData = {
  section: string;
  question: string;
  options: string[];
  completed?: boolean;
};

type Answer = {
  section: string;
  question: string;
  answer: string;
};

const TOTAL_QUESTIONS = 22;

const firstQuestion: QuestionData = {
  section: "Personal Details",
  question: "Choose your gender",
  options: ["Male", "Female"],
};

export default function GroqTestPage() {
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionData>(firstQuestion);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const progress = Math.min((answers.length / TOTAL_QUESTIONS) * 100, 100);

  const getIcon = (option: string) => {
    if (option === "Male") return "👨";
    if (option === "Female") return "👩";
    if (option === "Weight Loss") return "🔥";
    if (option === "Weight Gain") return "💪";
    if (option === "Healthy Maintenance") return "🌿";
    if (option === "Muscle Gain") return "🏋️";
    return "";
  };

  const handleNext = async () => {
    if (!selectedOption || loading) return;

    const newAnswer: Answer = {
      section: currentQuestion.section,
      question: currentQuestion.question,
      answer: selectedOption,
    };

    const updatedAnswers = [...answers, newAnswer];

    setAnswers(updatedAnswers);
    setSelectedOption("");
    setLoading(true);

    try {
      const apiMessages = updatedAnswers.map((item) => ({
        role: "user",
        content: item.answer,
      }));

      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      const data = await res.json();

      setCurrentQuestion({
        section: data.section,
        question: data.question,
        options: data.options || [],
        completed: data.completed || false,
      });
    } catch {
      setCurrentQuestion({
        section: "Error",
        question: "Something went wrong. Please try again.",
        options: ["Restart", "Try Again", "Continue", "Go Back"],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    if (loading || currentQuestion.completed) return;

    const skippedAnswer: Answer = {
      section: currentQuestion.section,
      question: currentQuestion.question,
      answer: "Skipped",
    };

    const updatedAnswers = [...answers, skippedAnswer];

    setAnswers(updatedAnswers);
    setSelectedOption("");
    setLoading(true);

    try {
      const apiMessages = updatedAnswers.map((item) => ({
        role: "user",
        content: item.answer,
      }));

      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      const data = await res.json();

      setCurrentQuestion({
        section: data.section,
        question: data.question,
        options: data.options || [],
        completed: data.completed || false,
      });
    } catch {
      setCurrentQuestion({
        section: "Error",
        question: "Something went wrong. Please try again.",
        options: ["Restart", "Try Again", "Continue", "Go Back"],
      });
    } finally {
      setLoading(false);
    }
  };

  const restartConsultation = () => {
    setAnswers([]);
    setSelectedOption("");
    setCurrentQuestion(firstQuestion);
  };

  return (
    <main className="page">
      <section className="phoneFrame">
        <div className="topBar">
          <p>AI Health Consultation</p>
          <button
            onClick={handleSkip}
            disabled={loading || currentQuestion.completed}
          >
            Skip
          </button>
        </div>

        <div className="progressBox">
          <div className="progressText">
            <span>Progress</span>
            <b>{Math.round(progress)}%</b>
          </div>
          <div className="progressTrack">
            <div className="progressFill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="contentArea">
          {!currentQuestion.completed && (
            <>
              <div className="sectionPill">{currentQuestion.section}</div>

              <h1>{currentQuestion.question}</h1>

              <div
                className={
                  currentQuestion.options.length === 2
                    ? "genderGrid"
                    : "optionsList"
                }
              >
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`optionCard ${
                      selectedOption === option ? "selected" : ""
                    }`}
                  >
                    <span className="optionLeft">
                      {getIcon(option) && (
                        <span className="optionIcon">{getIcon(option)}</span>
                      )}
                      <span>{option}</span>
                    </span>

                    <span className="checkCircle">
                      {selectedOption === option ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {currentQuestion.completed && (
            <div className="completedCard">
              <div className="successIcon">✓</div>
              <h2>Consultation Completed</h2>
              <p>
                AI has collected your personal details, health details, food
                preferences, lifestyle analysis and budget.
              </p>

              <button className="primaryButton">
                Generate Transformation Blueprint
              </button>

              <button className="secondaryButton" onClick={restartConsultation}>
                Start Again
              </button>
            </div>
          )}
        </div>

        {!currentQuestion.completed && (
          <div className="bottomArea">
            <button
              className="nextButton"
              onClick={handleNext}
              disabled={!selectedOption || loading}
            >
              {loading ? "Loading..." : "NEXT"}
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 30%),
            radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.18), transparent 35%),
            linear-gradient(135deg, #eaf4ff, #f8fbff);
          font-family: Arial, Helvetica, sans-serif;
        }

        .phoneFrame {
          width: 100%;
          max-width: 430px;
          min-height: 760px;
          background: #ffffff;
          border-radius: 34px;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.18);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .topBar {
          height: 62px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
        }

        .topBar p {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .topBar button {
          border: none;
          background: #eff6ff;
          color: #2563eb;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .progressBox {
          padding: 0 24px;
        }

        .progressText {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
          color: #64748b;
          font-weight: 700;
        }

        .progressTrack {
          height: 5px;
          width: 100%;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }

        .progressFill {
          height: 100%;
          background: linear-gradient(90deg, #0066ff, #00b4ff);
          transition: width 0.3s ease;
        }

        .contentArea {
          flex: 1;
          padding: 38px 26px 120px;
        }

        .sectionPill {
          display: inline-flex;
          padding: 9px 16px;
          border-radius: 999px;
          background: #eff6ff;
          color: #0066ff;
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 24px;
        }

        h1 {
          margin: 0 0 32px;
          font-size: 27px;
          line-height: 1.25;
          color: #0f172a;
        }

        .optionsList {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .genderGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .optionCard {
          width: 100%;
          min-height: 72px;
          border-radius: 18px;
          border: 1.5px solid #e5e7eb;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          font-size: 16px;
          font-weight: 800;
          color: #111827;
          cursor: pointer;
          transition: 0.2s ease;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
        }

        .genderGrid .optionCard {
          min-height: 130px;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          text-align: center;
        }

        .optionCard:hover {
          border-color: #60a5fa;
          transform: translateY(-2px);
        }

        .optionCard.selected {
          background: linear-gradient(135deg, #0066ff, #0088ff);
          color: white;
          border-color: #0066ff;
          box-shadow: 0 18px 38px rgba(0, 102, 255, 0.3);
        }

        .optionLeft {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .genderGrid .optionLeft {
          flex-direction: column;
          gap: 8px;
        }

        .optionIcon {
          font-size: 28px;
        }

        .genderGrid .optionIcon {
          font-size: 42px;
        }

        .checkCircle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .optionCard.selected .checkCircle {
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.25);
        }

        .genderGrid .checkCircle {
          position: absolute;
          opacity: 0;
        }

        .bottomArea {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 22px 26px 30px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0),
            #ffffff 35%
          );
        }

        .nextButton,
        .primaryButton {
          width: 100%;
          height: 58px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #0066ff, #82c6ff);
          color: white;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.05em;
          cursor: pointer;
          box-shadow: 0 18px 38px rgba(0, 102, 255, 0.28);
        }

        .nextButton:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }

        .completedCard {
          margin-top: 60px;
          text-align: center;
          padding: 28px 20px;
          border-radius: 26px;
          background: linear-gradient(135deg, #f0fdf4, #ecfeff);
          border: 1px solid #bbf7d0;
        }

        .successIcon {
          width: 72px;
          height: 72px;
          margin: 0 auto 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #16a34a;
          color: white;
          font-size: 36px;
          font-weight: 900;
        }

        .completedCard h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 24px;
        }

        .completedCard p {
          margin: 0 0 22px;
          color: #475569;
          line-height: 1.6;
          font-size: 15px;
        }

        .secondaryButton {
          width: 100%;
          height: 52px;
          margin-top: 12px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          font-weight: 900;
          cursor: pointer;
        }

        @media (max-width: 520px) {
          .page {
            padding: 0;
            background: #ffffff;
          }

          .phoneFrame {
            max-width: 100%;
            min-height: 100vh;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
