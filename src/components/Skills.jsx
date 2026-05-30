function Skills() {
    const technical = [
        "Cybersecurity Fundamentals",
        "Networking (TCP/IP, DNS, DHCP)",
        "Linux",
        "Python",
        "Identity & Access Management (IAM)",
        "Access Control & RBAC",
        "Security Monitoring",
        "Wireshark",
        "Active Directory (Basic)",
        "Git & GitHub",
    ]

    const soft = [
        "Problem Solving",
        "Analytical Thinking",
        "Adaptability",
        "Team Collaboration",
        "Time Management",
        "Continuous Learning",
    ]

    return (
        <section id="skills" className="bg-black text-white py-16 px-6">
            <div className="max-w-4xl mx-auto">

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                    What I know
                </p>

                <h2 className="text-5xl font-extrabold mb-10">
                    My <span className="text-blue-500">Skills</span>
                </h2>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div>
                        <h3 className="text-blue-400 text-sm font-mono tracking-widest mb-6">
                            Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {technical.map((skill) => (
                                <span
                                    key={skill}
                                    className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-blue-400 text-sm font-mono tracking-widest mb-6">
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {soft.map((skill) => (
                                <span
                                    key={skill}
                                    className="border border-gray-700 text-gray-300 text-sm font-mono px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Skills