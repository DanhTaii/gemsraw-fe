import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const suggestions = ['School', 'Weather', 'House', 'Ocean'];

export default function FlashcardSetup({ topic, setTopic, count, setCount, onStart }) {
    return (
        <div className="text-center mt-4">
            <InputGroup className="mb-3 justify-content-center">
                <Form.Control
                    style={{ maxWidth: '400px', borderRadius: '20px' }}
                    placeholder="Nhập chủ đề bạn muốn"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                />
            </InputGroup>

            <div className="mb-3">
                <div className="mb-2 fw-bold">Gợi ý :</div>
                {suggestions.map((text, idx) => (
                    <Button
                        key={idx}
                        variant="light"
                        className="me-2 shadow-sm rounded"
                        onClick={() => setTopic(text)}
                    >
                        {text}
                    </Button>
                ))}
            </div>

            <div className="mb-3">
                <div className="fw-bold">Số lượng flashcard:</div>
                <Form.Control
                    type="number"
                    min={1}
                    style={{ maxWidth: '300px', margin: '0 auto', borderRadius: '20px' }}
                    value={count}
                    onChange={e => setCount(e.target.value)}
                />
            </div>

            <Button onClick={onStart} className="px-4 rounded-pill mt-2">Start</Button>
        </div>
    );
}
