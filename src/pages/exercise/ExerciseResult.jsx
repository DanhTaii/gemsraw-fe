import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExercise } from "../../context/ExerciseContext";
import "./Exercise.css";

const ExerciseResult = () => {
    const { questions, setQuestions } = useExercise();
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleSelectAnswer = (questionId, option) => {
        if (submitted) return; // Nếu đã nộp bài thì không cho chọn nữa

        const updatedQuestions = questions.map((q) =>
            q.id === questionId ? { ...q, userAnswer: option } : q
        );
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q) => {
            if (q.userAnswer === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setSubmitted(true);
    };

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="exercise-container">
            <h2>Làm bài tập</h2>
            {questions.map((q) => (
                <div key={q.id} className="exercise-question">
                    <p>{q.question}</p>
                    <div className="exercise-options">
                        {q.options.map((option) => (
                            <button
                                key={option}
                                className={
                                    q.userAnswer === option
                                        ? "selected"
                                        : submitted && option === q.correctAnswer
                                            ? "correct"
                                            : ""
                                }
                                onClick={() => handleSelectAnswer(q.id, option)}
                                disabled={submitted} // Sau khi nộp bài thì không cho bấm nữa
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {!submitted ? (
                <button className="submit-button" onClick={handleSubmit}>
                    Nộp bài
                </button>
            ) : (
                <div className="result-summary">
                    <p>Bạn đã làm đúng {score}/{questions.length} câu.</p>
                    <button className="submit-button" onClick={handleGoBack}>
                        Quay về trang chủ
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExerciseResult;
