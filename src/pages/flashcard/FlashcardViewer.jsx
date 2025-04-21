"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFlashcards, useTheme } from "../../context"
import "./FlashcardViewer.css"

function FlashcardViewer() {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { currentSetId, currentCardIndex, nextCard, previousCard, getCurrentSet, getCurrentCard } = useFlashcards()

    const currentSet = getCurrentSet()
    const currentCard = getCurrentCard()

    useEffect(() => {
        // Redirect if no set is selected
        if (!currentSetId) {
            navigate("/flashcard")
        }
    }, [currentSetId, navigate])

    if (!currentSet || !currentCard) {
        return <div className="loading">Loading flashcards...</div>
    }

    return (
        <div className={`flashcard-viewer ${theme}`}>
            <h2>{currentSet.title}</h2>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${((currentCardIndex + 1) / currentSet.cards.length) * 100}%` }}
                ></div>
            </div>
            <p className="card-count">
                Card {currentCardIndex + 1} of {currentSet.cards.length}
            </p>

            <div className="flashcard">
                <div className="card-content">
                    <div className="front">{currentCard.front}</div>
                    <div className="back">{currentCard.back}</div>
                </div>
            </div>

            <div className="navigation-buttons">
                <button onClick={previousCard} disabled={currentCardIndex === 0} className="nav-button prev">
                    Previous
                </button>
                <button
                    onClick={nextCard}
                    disabled={currentCardIndex === currentSet.cards.length - 1}
                    className="nav-button next"
                >
                    Next
                </button>
            </div>

            <button onClick={() => navigate("/flashcard")} className="back-button">
                Back to Sets
            </button>
        </div>
    )
}

export default FlashcardViewer
