function Hero() {
    return (
        <section className="bg-black text-white min-h-screen flex items-center px-6">
            <div className="max-w-4xl mx-auto w-full">

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                    Hello, I am
                </p>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
                    Dharmesh <br />
                    <span className="text-blue-500">Godhaniya</span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl font-mono mb-8">
                    Cybersecurity Enthusiast · SOC L1 Aspirant · B.Tech CE
                </p>

                <div className="border-t border-gray-800 mb-8 w-24"></div>

                <div className="flex flex-col gap-3 mb-10 text-sm text-gray-400">






                </div>
                <div className="flex flex-wrap gap-4">
                    <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                        View Projects
                    </a>
                    <a href="#contact" className="border border-blue-600 text-blue-400 hover:bg-blue-900 font-semibold px-6 py-3 rounded-lg transition">
                        Contact Me
                    </a>
                    <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition">
                        Download CV
                    </a>
                </div>


            </div>
        </section>
    )
}

export default Hero