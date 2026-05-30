import { useNavigate } from 'react-router-dom'

function P3() {
    const navigate = useNavigate()

    return (
        <div className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => navigate('/')}
                    className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition flex items-center gap-2"
                >
                    ← Back to Portfolio
                </button>

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Project 03</p>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Security Log Analyzer <br />
                    <span className="text-blue-500">Using Python</span>
                </h1>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Python</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Log Analysis</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Security Monitoring</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Threat Detection</span>
                </div>

                <div className="flex flex-col gap-10">

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Overview</h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            Developed a Python-based tool to parse and analyze security log files,
                            detect suspicious activity, and generate automated alerts — simulating
                            a core task performed by SOC analysts daily.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Did</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Developed a Python-based tool to analyze security log files.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Detected multiple failed login attempts and unusual login behavior.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Generated automated alerts and summarized security events.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Improved understanding of log analysis and security monitoring workflows.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Learned</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How to parse and filter log files using Python.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Pattern recognition techniques for detecting brute force attempts.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How automated alerting works in real SOC environments.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Importance of log management in threat detection workflows.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Status</h2>
                        <span className="border border-green-700 text-green-400 text-sm font-mono px-4 py-2 rounded-lg">Completed</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default P3