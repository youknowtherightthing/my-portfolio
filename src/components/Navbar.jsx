import { useState } from 'react'

function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-800 z-50 px-6 py-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">

                <a href="#" className="text-white font-extrabold text-lg tracking-tight">
                    Dharmesh <span className="text-blue-500">Godhaniya</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-gray-400 hover:text-white text-sm font-mono transition">About</a>
                    <a href="#skills" className="text-gray-400 hover:text-white text-sm font-mono transition">Skills</a>
                    <a href="#projects" className="text-gray-400 hover:text-white text-sm font-mono transition">Projects</a>
                    <a href="#contact" className="text-gray-400 hover:text-white text-sm font-mono transition">Contact</a>
                    <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                        Download CV
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-400 hover:text-white transition"
                >
                    {open ? '✕' : '☰'}
                </button>

            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden flex flex-col gap-4 px-6 pt-4 pb-6 border-t border-gray-800 mt-4">
                    <a href="#about" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-sm font-mono transition">About</a>
                    <a href="#skills" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-sm font-mono transition">Skills</a>
                    <a href="#projects" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-sm font-mono transition">Projects</a>
                    <a href="#contact" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-sm font-mono transition">Contact</a>
                    <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center transition">
                        Download CV
                    </a>
                </div>
            )}
        </nav>
    )
}

export default Navbar