import React from "react";
import { useExercise } from "../../context/ExerciseContext";
import "./Exercise.css";

const Exercise = () => {
    const {
        topic, setTopic,
        numberOfQuestions, setNumberOfQuestions,
        questionType, setQuestionType,
        difficulty, setDifficulty,
        generateExercise,
    } = useExercise();

    return (
        <div className="exercise-container">
            <h2>Exercise Generator</h2>
            <input
                type="text"
                placeholder="Nhập chủ đề bài tập..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="exercise-input"
            />

            <div className="exercise-suggestion">
                <button onClick={() => setTopic("My best friend")}>My best friend</button>
                <button onClick={() => setTopic("My classroom")}>My classroom</button>
                <button onClick={() => setTopic("Fruits and Vegetables")}>Fruits and Vegetables</button>
                <button onClick={() => setTopic("Ocean")}>Ocean</button>
            </div>

            <input
                type="number"
                placeholder="Số lượng câu hỏi"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="exercise-input"
                min="1"
                max="20"
            />

            <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="exercise-select"
            >
                <option value="Grammar">Grammar: Ngữ pháp</option>
                <option value="Most Suitable Word">Most Suitable Word: Chọn từ thích hợp nhất</option>
                <option value="Sentence Completion">Sentence Completion: Điền vào chỗ trống</option>
            </select>

            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="exercise-select"
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <button className="exercise-button" onClick={generateExercise}>
                Tạo bài tập
            </button>
        </div>
    );
};

export default Exercise;
