import React, { useState } from 'react';
import FlashcardSetup from './FlashcardSetup';
import FlashcardViewer from './FlashcardViewer';

export default function Flashcard() {
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [started, setStarted] = useState(false);

    const mockFlashcards = Array.from({ length: count }, (_, i) => ({
        front: `${topic} - Card ${i + 1}`,
        back: `Answer ${i + 1}`
    }));

    return (
        <div>
            {!started ? (
                <FlashcardSetup
                    topic={topic}
                    setTopic={setTopic}
                    count={count}
                    setCount={setCount}
                    onStart={() => setStarted(true)}
                />
            ) : (
                <FlashcardViewer
                    flashcards={mockFlashcards}
                    onClose={() => setStarted(false)}
                />
            )}
        </div>
    );
}
