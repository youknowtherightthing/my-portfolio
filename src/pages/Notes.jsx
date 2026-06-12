import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Notes() {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])
    const [input, setInput] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('hero_notes')
        if (saved) setNotes(JSON.parse(saved))
    }, [])

    const saveNotes = (updated) => {
        setNotes(updated)
        localStorage.setItem('hero_notes', JSON.stringify(updated))
    }

    const addNote = () => {
        if (!input.trim()) return
        const newNote = {
            id: Date.now(),
            title: title.trim() || 'Untitled',
            text: input.trim(),
            date: new Date().toLocaleDateString()
        }
        saveNotes([newNote, ...notes])
        setInput('')
        setTitle('')
    }

    const deleteNote = (id) => {
        if (!window.confirm('Delete this note?')) return
        saveNotes(notes.filter(n => n.id !== id))
    }

    return (
        <div className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-4xl mx-auto">

                <button onClick={() => navigate('/')} className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition">
                    Back to Portfolio
                </button>

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">My Notes</p>
                <h1 className="text-5xl font-extrabold mb-4">
                    Quick <span className="text-blue-500">Notes</span>
                </h1>
                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="border border-gray-800 rounded-2xl p-6 mb-10">
                    <p className="text-blue-400 text-xs font-mono tracking-widest mb-4">New Note</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note title..."
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-600 mb-3"
                    />
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && addNote()}
                        placeholder="Write your note here... (Ctrl+Enter to save)"
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-600 mb-4 resize-none"
                    />
                    <button
                        onClick={addNote}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
                    >
                        Save Note
                    </button>
                </div>

                <p className="text-blue-400 text-xs font-mono tracking-widest mb-6">
                    Saved Notes ({notes.length})
                </p>

                {notes.length === 0 && (
                    <p className="text-gray-600 font-mono text-sm">No notes yet. Add your first note above!</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notes.map((note) => (
                        <div key={note.id} className="border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition flex flex-col justify-between gap-4">
                            <div>
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-white font-bold text-base">{note.title}</h3>
                                    <span className="text-gray-700 font-mono text-xs">{note.date}</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{note.text}</p>
                            </div>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="border border-red-900 text-red-500 hover:bg-red-950 text-xs font-mono px-3 py-2 rounded-lg transition w-fit"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Notes