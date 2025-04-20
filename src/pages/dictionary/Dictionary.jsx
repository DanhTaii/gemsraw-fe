"use client"

import { useState } from "react"
import { useDictionary, useTheme, useApp } from "../../context"
import "./Dictionary.css"

function Dictionary() {
    const { theme } = useTheme()
    const { showNotification } = useApp()
    const { entries, searchTerm, searchResults, setSearchTerm, addEntry, updateEntry, deleteEntry } = useDictionary()

    const [newTerm, setNewTerm] = useState("")
    const [newDefinition, setNewDefinition] = useState("")
    const [editingId, setEditingId] = useState(null)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleAddEntry = (e) => {
        e.preventDefault()

        if (!newTerm.trim() || !newDefinition.trim()) {
            showNotification("Please fill in both term and definition", "error")
            return
        }

        if (editingId) {
            updateEntry(editingId, { term: newTerm, definition: newDefinition })
            showNotification("Entry updated successfully", "success")
            setEditingId(null)
        } else {
            addEntry({ term: newTerm, definition: newDefinition })
            showNotification("New entry added successfully", "success")
        }

        setNewTerm("")
        setNewDefinition("")
    }

    const handleEdit = (entry) => {
        setNewTerm(entry.term)
        setNewDefinition(entry.definition)
        setEditingId(entry.id)
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            deleteEntry(id)
            showNotification("Entry deleted successfully", "info")
        }
    }

    const handleCancelEdit = () => {
        setNewTerm("")
        setNewDefinition("")
        setEditingId(null)
    }

    return (
        <div className={`container py-4 ${theme}`}>
            <h1 className="text-center fw-bold mb-4">📚 Dictionary</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>

            <form onSubmit={handleAddEntry} className="card p-4 mb-5 shadow-sm">
                <h2 className="mb-3">{editingId ? "Edit Entry" : "Add New Entry"}</h2>
                <div className="mb-3">
                    <label htmlFor="term" className="form-label">Term</label>
                    <input
                        type="text"
                        id="term"
                        className="form-control"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        placeholder="Enter term"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="definition" className="form-label">Definition</label>
                    <textarea
                        id="definition"
                        className="form-control"
                        value={newDefinition}
                        onChange={(e) => setNewDefinition(e.target.value)}
                        placeholder="Enter definition"
                        rows="3"
                    ></textarea>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        {editingId ? "Update Entry" : "Add Entry"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h2 className="mb-3">Dictionary Entries ({searchResults.length})</h2>
                {searchResults.length === 0 ? (
                    <p className="text-muted">No entries found.</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {searchResults.map((entry) => (
                            <div key={entry.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{entry.term}</h5>
                                        <p className="card-text">{entry.definition}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end gap-2">
                                        <button onClick={() => handleEdit(entry)} className="btn btn-outline-warning btn-sm">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(entry.id)} className="btn btn-outline-danger btn-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dictionary
