function About() {
    return (
        <section id="about" className="bg-gray-950 text-white py-16 px-6">
            <div className="max-w-4xl mx-auto">

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                    Who I am
                </p>

                <h2 className="text-5xl font-extrabold mb-10">
                    About <span className="text-blue-500">Me</span>
                </h2>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                    Third-year B.Tech Computer Engineering student with interests in{" "}
                    <span className="text-blue-400 font-semibold">Cybersecurity</span>,{" "}
                    <span className="text-blue-400 font-semibold">Networking</span>, and{" "}
                    <span className="text-blue-400 font-semibold">Security Operations</span>.
                    Seeking an internship to gain hands-on experience, apply technical
                    skills, and grow in the cybersecurity field.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                    <span className="border border-blue-700 text-blue-400 text-sm font-mono px-4 py-2 rounded-lg">
                        SOC L1 Aspirant
                    </span>
                    <span className="border border-blue-700 text-blue-400 text-sm font-mono px-4 py-2 rounded-lg">
                        Open to Internship
                    </span>
                    <span className="border border-blue-700 text-blue-400 text-sm font-mono px-4 py-2 rounded-lg">
                        Vadodara, Gujarat
                    </span>
                </div>

            </div>
        </section>
    )
}

export default About