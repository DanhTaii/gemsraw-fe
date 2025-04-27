import { createContext, useContext, useState, useEffect } from "react"

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

    useEffect(() => {
        localStorage.setItem("dictionaryEntries", JSON.stringify(entries))
    }, [entries])

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

export function useDictionary() {
    const context = useContext(DictionaryContext)
    if (context === undefined) {
        throw new Error("useDictionary must be used within a DictionaryProvider")
    }
    return context
}
