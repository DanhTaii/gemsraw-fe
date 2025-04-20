"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define the shape of our context
const FlashcardContext = createContext(undefined)

export function FlashcardProvider({ children }) {
    const [flashcardSets, setFlashcardSets] = useState(() => {
        if (typeof window !== "undefined") {
            const savedSets = localStorage.getItem("flashcardSets")
            return savedSets ? JSON.parse(savedSets) : []
        }
        return []
    })

    const [currentSetId, setCurrentSetId] = useState(null)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    // Update localStorage when flashcard sets change
    useEffect(() => {
        localStorage.setItem("flashcardSets", JSON.stringify(flashcardSets))
    }, [flashcardSets])

    const addFlashcardSet = (newSet) => {
        setFlashcardSets((prevSets) => [...prevSets, { ...newSet, id: Date.now().toString() }])
    }

    const updateFlashcardSet = (id, updatedSet) => {
        setFlashcardSets((prevSets) => prevSets.map((set) => (set.id === id ? { ...set, ...updatedSet } : set)))
    }

    const deleteFlashcardSet = (id) => {
        setFlashcardSets((prevSets) => prevSets.filter((set) => set.id !== id))
        if (currentSetId === id) {
            setCurrentSetId(null)
            setCurrentCardIndex(0)
        }
    }

    const selectFlashcardSet = (id) => {
        setCurrentSetId(id)
        setCurrentCardIndex(0)
    }

    const nextCard = () => {
        const currentSet = flashcardSets.find((set) => set.id === currentSetId)
        if (currentSet && currentCardIndex < currentSet.cards.length - 1) {
            setCurrentCardIndex((prevIndex) => prevIndex + 1)
        }
    }

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex((prevIndex) => prevIndex - 1)
        }
    }

    const getCurrentSet = () => {
        return flashcardSets.find((set) => set.id === currentSetId) || null
    }

    const getCurrentCard = () => {
        const currentSet = getCurrentSet()
        if (currentSet && currentSet.cards && currentSet.cards.length > currentCardIndex) {
            return currentSet.cards[currentCardIndex]
        }
        return null
    }

    const value = {
        flashcardSets,
        currentSetId,
        currentCardIndex,
        addFlashcardSet,
        updateFlashcardSet,
        deleteFlashcardSet,
        selectFlashcardSet,
        nextCard,
        previousCard,
        getCurrentSet,
        getCurrentCard,
    }

    return <FlashcardContext.Provider value={value}>{children}</FlashcardContext.Provider>
}

// Custom hook for using the flashcard context
export function useFlashcards() {
    const context = useContext(FlashcardContext)
    if (context === undefined) {
        throw new Error("useFlashcards must be used within a FlashcardProvider")
    }
    return context
}
