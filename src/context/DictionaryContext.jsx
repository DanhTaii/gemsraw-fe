"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define the shape of our context
const DictionaryContext = createContext(undefined)

export function DictionaryProvider({ children }) {
    const [entries, setEntries] = useState(() => {
        if (typeof window !== "undefined") {
            const savedEntries = localStorage.getItem("dictionaryEntries")
            return savedEntries ? JSON.parse(savedEntries) : []
        }
        return []
    })

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    // Update localStorage when entries change
    useEffect(() => {
        localStorage.setItem("dictionaryEntries", JSON.stringify(entries))
    }, [entries])

    // Update search results when search term or entries change
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults(entries)
            return
        }

        const filteredResults = entries.filter(
            (entry) =>
                entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.definition.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        setSearchResults(filteredResults)
    }, [searchTerm, entries])

    const addEntry = (newEntry) => {
        setEntries((prevEntries) => [...prevEntries, { ...newEntry, id: Date.now().toString() }])
    }

    const updateEntry = (id, updatedEntry) => {
        setEntries((prevEntries) => prevEntries.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry)))
    }

    const deleteEntry = (id) => {
        setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id))
    }

    const value = {
        entries,
        searchTerm,
        searchResults,
        setSearchTerm,
        addEntry,
        updateEntry,
        deleteEntry,
    }

    return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>
}

// Custom hook for using the dictionary context
export function useDictionary() {
    const context = useContext(DictionaryContext)
    if (context === undefined) {
        throw new Error("useDictionary must be used within a DictionaryProvider")
    }
    return context
}
