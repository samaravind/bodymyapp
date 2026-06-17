"use client";

import { useState } from "react";
import ProfileMenu from "./profile-menu";

type QuestionData = {
  section: string;
  question: string;
  options: string[];
  completed?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
};

const firstQuestion: QuestionData = {
  section: "Personal Details",
  question: "Choose your gender",
  options: ["Male", "Female"],
  questionNumber: 1,
  totalQuestions: 22,
};

export default function ConsultationClient({ onClose }: { onClose?: () => void }) {
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionData>(firstQuestion);

  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadQuestion = async (updatedAnswers: string[]) => {
    const apiMessages = updatedAnswers.map((answer) => ({
      role: "user",
      content: answer,
    }));

    const res = await fetch("/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: apiMessages }),
    });

    if (!res.ok) {
      throw new Error("Question service returned an error.");
    }

    const data = await res.json();

    setCurrentQuestion({
      section: data.section,
      question: data.question,
      options: data.options || [],
      completed: data.completed || false,
      questionNumber: data.questionNumber,
      totalQuestions: data.totalQuestions,
    });
  };

  const handleNext = async () => {
    if (!selectedOption || loading) return;

    const updatedAnswers = [...answers, selectedOption];

    setLoading(true);
    setErrorMessage("");

    try {
      await loadQuestion(updatedAnswers);
      setAnswers(updatedAnswers);
      setSelectedOption("");
    } catch {
      setErrorMessage("Could not load the next question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    if (loading || currentQuestion.completed) return;

    const updatedAnswers = [...answers, "Skipped"];

    setLoading(true);
    setErrorMessage("");

    try {
      await loadQuestion(updatedAnswers);
      setAnswers(updatedAnswers);
      setSelectedOption("");
    } catch {
      setErrorMessage("Could not skip this question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setAnswers([]);
    setSelectedOption("");
    setCurrentQuestion(firstQuestion);
  };

  return (
    <main style={styles.page}>
      <div style={styles.profile}>
        <ProfileMenu />
      </div>
      <div style={styles.card}>
        <div style={styles.top}>
          <b>AI Health Consultation</b>
          <div style={styles.topActions}>
            {!currentQuestion.completed ? (
              <span style={styles.progress}>
                {currentQuestion.questionNumber || answers.length + 1}/
                {currentQuestion.totalQuestions || 22}
              </span>
            ) : null}
            {currentQuestion.completed && onClose ? (
              <button onClick={onClose} style={styles.restart}>
                Close
              </button>
            ) : (
              <button
                onClick={handleSkip}
                disabled={loading}
                style={{
                  ...styles.restart,
                  opacity: loading ? 0.5 : 1,
                }}
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {!currentQuestion.completed ? (
          <>
            <div style={styles.badge}>{currentQuestion.section}</div>

            <h1 style={styles.question}>{currentQuestion.question}</h1>

            {errorMessage ? (
              <p style={styles.errorMessage}>{errorMessage}</p>
            ) : null}

            <div
              style={{
                ...styles.options,
                gridTemplateColumns:
                  currentQuestion.options.length === 2 ? "1fr 1fr" : "1fr",
              }}
            >
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  style={{
                    ...styles.option,
                    ...(selectedOption === option ? styles.selected : {}),
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedOption || loading}
              style={{
                ...styles.next,
                opacity: !selectedOption || loading ? 0.5 : 1,
              }}
            >
              {loading ? "Loading..." : "NEXT"}
            </button>
          </>
        ) : (
          <div style={styles.completed}>
            <h2>Consultation Completed</h2>
            <p>
              AI has collected all details. Now we can generate your
              transformation blueprint.
            </p>
            <div style={styles.completedActions}>
              {onClose ? (
                <button onClick={onClose} style={{ ...styles.next, marginTop: 0 }}>
                  Close
                </button>
              ) : null}
              <button onClick={restart} style={styles.secondaryNext}>
                Start Again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at 68% 30%, rgba(32, 214, 93, 0.34), transparent 26%), radial-gradient(circle at 20% 10%, rgba(20, 184, 166, 0.18), transparent 24%), #030812",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    position: "relative",
  },
  profile: {
    position: "fixed",
    top: "18px",
    right: "18px",
    zIndex: 20,
  },
  card: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "min(720px, calc(100dvh - 40px))",
    background: "#070f1c",
    borderRadius: "32px",
    padding: "24px",
    boxShadow: "0 30px 90px rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "35px",
  },
  topActions: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
  },
  progress: {
    background: "rgba(16, 185, 129, 0.16)",
    borderRadius: "999px",
    color: "#4ade80",
    fontSize: "14px",
    fontWeight: 800,
    padding: "8px 12px",
    whiteSpace: "nowrap",
  },
  restart: {
    borderWidth: 0,
    background: "rgba(16, 185, 129, 0.16)",
    color: "#4ade80",
    padding: "8px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
  badge: {
    display: "inline-block",
    background: "rgba(16, 185, 129, 0.16)",
    color: "#22c55e",
    padding: "9px 16px",
    borderRadius: "999px",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  question: {
    fontSize: "28px",
    lineHeight: "1.25",
    marginBottom: "30px",
  },
  errorMessage: {
    background: "rgba(248, 113, 113, 0.12)",
    border: "1px solid rgba(248, 113, 113, 0.32)",
    borderRadius: "14px",
    color: "#fecaca",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: 1.4,
    margin: "-12px 0 22px",
    padding: "12px 14px",
  },
  options: {
    display: "grid",
    gap: "16px",
    marginBottom: "28px",
  },
  option: {
    minHeight: "75px",
    borderRadius: "18px",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.16)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  selected: {
    background: "linear-gradient(135deg, #4ade80, #10b981)",
    color: "#020617",
    borderColor: "#22c55e",
  },
  next: {
    marginTop: "auto",
    height: "58px",
    width: "100%",
    borderWidth: 0,
    borderRadius: "999px",
    background: "linear-gradient(135deg, #4ade80, #10b981)",
    color: "#020617",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
  secondaryNext: {
    width: "100%",
    height: "58px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
  completed: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: "120px",
  },
  completedActions: {
    bottom: "28px",
    display: "grid",
    gap: "14px",
    left: "24px",
    position: "absolute",
    right: "24px",
  },
};
