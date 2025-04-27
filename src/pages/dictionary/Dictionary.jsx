import { useState } from "react"
import { useDictionary, useApp } from "../../context"
import DictionaryAdd from "./DictionaryAdd"
import "./Dictionary.css"

function Dictionary() {
    const { showNotification } = useApp()
    const { entries, searchTerm, searchResults, setSearchTerm, addEntry, updateEntry, deleteEntry } = useDictionary()

    const [newTerm, setNewTerm] = useState("")
    const [newDefinition, setNewDefinition] = useState("")
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleAddEntry = (e) => {
        e.preventDefault()

        if (!newTerm.trim() || !newDefinition.trim()) {
            showNotification("Vui lòng điền cả thuật ngữ và định nghĩa", "error")
            return
        }

        if (editingId) {
            updateEntry(editingId, { term: newTerm, definition: newDefinition })
            showNotification("Cập nhật thành công", "success")
            setEditingId(null)
        } else {
            addEntry({ term: newTerm, definition: newDefinition })
            showNotification("Thêm mới thành công", "success")
        }

        setNewTerm("")
        setNewDefinition("")
        setShowForm(false)
    }

    const handleEdit = (entry) => {
        setNewTerm(entry.term)
        setNewDefinition(entry.definition)
        setEditingId(entry.id)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
            deleteEntry(id)
            showNotification("Đã xóa thành công", "info")
        }
    }

    const handleCancelEdit = () => {
        setNewTerm("")
        setNewDefinition("")
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className={`container py-4 `}>
            <h1 className="text-center fw-bold mb-4">Dictionary</h1>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <DictionaryAdd
                            newTerm={newTerm}
                            setNewTerm={setNewTerm}
                            newDefinition={newDefinition}
                            setNewDefinition={setNewDefinition}
                            editingId={editingId}
                            handleAddEntry={handleAddEntry}
                            handleCancelEdit={handleCancelEdit}
                        />
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="mb-4">
                    <div className="input-group">
                        <span className="input-group-text">
                            Số mục: {searchResults.length}
                        </span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="form-control"
                        />
                    </div>
                </div>
                {!showForm && (
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setShowForm(true)
                            setEditingId(null)
                        }}
                    >
                        + Thêm
                    </button>
                )}
            </div>

            {searchResults.length === 0 ? (
                <p className="text-muted">Không tìm thấy kết quả.</p>
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
                                    <button onClick={() => handleEdit(entry)}
                                            className="btn btn-outline-warning btn-sm">
                                        Sửa
                                    </button>
                                    <button onClick={() => handleDelete(entry.id)}
                                            className="btn btn-outline-danger btn-sm">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dictionary
