import { useState, useEffect } from 'react'

function NoteSection() {
    const [notes, setNotes] = useState([])
    const [input, setInput] = useState('')

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
            text: input.trim(),
            date: new Date().toLocaleDateString()
        }
        saveNotes([newNote, ...notes])
        setInput('')
    }

    const deleteNote = (id) => {
        saveNotes(notes.filter(n => n.id !== id))
    }

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    placeholder="Add a note..."
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-600"
                />
                <button
                    onClick={addNote}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition text-sm"
                >
                    Add
                </button>
            </div>
            {notes.length === 0 && (
                <p className="text-gray-700 font-mono text-xs">No notes yet. Type above and press Enter!</p>
            )}
            <div className="flex flex-col gap-2">
                {notes.map((note) => (
                    <div key={note.id} className="flex items-start justify-between border border-gray-800 rounded-lg px-4 py-3 hover:border-blue-900 transition">
                        <div>
                            <p className="text-gray-300 text-sm">{note.text}</p>
                            <p className="text-gray-700 font-mono text-xs mt-1">{note.date}</p>
                        </div>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="text-gray-700 hover:text-red-500 font-mono text-xs ml-4 transition"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
} function Hero() {
    const [showNotes, setShowNotes] = useState(false)
    return (
        <section className="bg-black text-white min-h-screen flex items-center px-6 pt-24">   <div className="max-w-4xl mx-auto w-full">

            <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                Hello, I am
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
                Dharmesh <br />
                <span className="text-blue-500">Godhaniya</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-mono mb-8">
                <a href="/storage" className="hover:text-blue-400 transition cursor-pointer">
                    Cybersecurity Enthusiast
                </a>
                {" · "}
                <span
                    onClick={() => setShowNotes(!showNotes)}
                    className="hover:text-blue-400 transition cursor-pointer"
                >
                    SOC L1 Aspirant
                </span>
                {" · "}B.Tech CSE
            </p>

            {showNotes && }
            <div className="border-t border-gray-800 mb-8 w-24"></div>

            <div className="mb-8 max-w-xl">
                <p className="text-blue-400 text-xs font-mono tracking-widest mb-4">// Quick Notes</p>
                <NoteSection />
            </div>

            <div className="flex flex-col gap-3 mb-10 text-sm text-gray-400">






            </div>
            <div className="flex flex-wrap gap-4">
                <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                    View Projects
                </a>
                <a href="#contact" className="border border-blue-600 text-blue-400 hover:bg-blue-900 font-semibold px-6 py-3 rounded-lg transition">
                    Contact Me
                </a>

            </div>


        </div>
        </section>
    )
}

export default Hero