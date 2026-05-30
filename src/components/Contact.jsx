function Contact() {
    return (
        <section id="contact" className="bg-black text-white py-16 px-6">
            <div className="max-w-4xl mx-auto">

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                    Get in touch
                </p>

                <h2 className="text-5xl font-extrabold mb-10">
                    Contact <span className="text-blue-500">Me</span>
                </h2>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <p className="text-gray-400 text-base leading-relaxed max-w-xl mb-12">
                    I am actively looking for a SOC L1 internship opportunity. Feel free
                    to reach out — I would love to connect!
                </p>

                <div className="flex flex-col gap-6">

                    <div className="flex items-center gap-6 border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition">
                        <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center font-bold text-blue-300 text-sm flex-shrink-0">
                            @
                        </div>
                        <div>
                            <p className="text-blue-400 text-xs font-mono tracking-widest mb-1">Email</p>
                            <a href="mailto:dharmeshgodhaniya048@gmail.com" className="text-white font-semibold hover:text-blue-400 transition">
                                dharmeshgodhaniya048@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition">
                        <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center font-bold text-blue-300 text-sm flex-shrink-0">
                            Tel
                        </div>
                        <div>
                            <p className="text-blue-400 text-xs font-mono tracking-widest mb-1">Phone</p>
                            <a href="tel:+919106464784" className="text-white font-semibold hover:text-blue-400 transition">
                                +91 9106464784
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition">
                        <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center font-bold text-blue-300 text-sm flex-shrink-0">
                            in
                        </div>
                        <div>
                            <p className="text-blue-400 text-xs font-mono tracking-widest mb-1">LinkedIn</p>
                            <a href="https://www.linkedin.com/in/dharmesh-godhaniya-378548287" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-400 transition">
                                Dharmesh Godhaniya
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center">
                    <p className="text-gray-600 text-sm font-mono">
                        2026 Dharmesh Godhaniya · Built with React and Tailwind CSS
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Contact