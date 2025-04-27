function DictionaryAdd({
                           newTerm,
                           setNewTerm,
                           newDefinition,
                           setNewDefinition,
                           editingId,
                           handleAddEntry,
                           handleCancelEdit
                       }) {
    return (
        <form onSubmit={handleAddEntry} className="card p-4 mb-4 shadow-sm">
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
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default DictionaryAdd
