import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Tạo Context
const ExerciseContext = createContext();

// Hook để dễ dùng trong các component khác
export const useExercise = () => useContext(ExerciseContext);

// Provider để bọc App
export const ExerciseProvider = ({ children }) => {
    const [topic, setTopic] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [questionType, setQuestionType] = useState("Grammar");
    const [difficulty, setDifficulty] = useState("Easy");
    const [questions, setQuestions] = useState([]);

    const navigate = useNavigate();

    const generateExercise = () => {
        // Tạo danh sách câu hỏi giả dựa trên lựa chọn
        const generated = Array.from({ length: numberOfQuestions }, (_, index) => ({
            id: index + 1,
            question: `Câu hỏi ${index + 1} về chủ đề "${topic}"`,
            options: ["A", "B", "C", "D"],
            answer: "A", // Tạm thời luôn là A
            userAnswer: null, // Lưu đáp án người dùng chọn
        }));

        setQuestions(generated);
        navigate("/exercise/result");
    };

    return (
        <ExerciseContext.Provider value={{
            topic, setTopic,
            numberOfQuestions, setNumberOfQuestions,
            questionType, setQuestionType,
            difficulty, setDifficulty,
            questions, setQuestions,
            generateExercise,
        }}>
            {children}
        </ExerciseContext.Provider>
    );
};
