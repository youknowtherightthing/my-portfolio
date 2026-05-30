import { useNavigate } from 'react-router-dom'

function P4() {
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

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Project 04</p>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Network Traffic Analysis <br />
                    <span className="text-blue-500">Using Wireshark</span>
                </h1>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Wireshark</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Packet Analysis</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Protocol Analysis</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Network Security</span>
                </div>

                <div className="flex flex-col gap-10">

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Overview</h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            Captured and analyzed real network traffic using Wireshark to understand
                            how data flows across a network, identify common protocols, and detect
                            unusual or potentially malicious network behavior.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Did</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Captured and analyzed network traffic using Wireshark.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Examined common protocols such as TCP, UDP, DNS, DHCP, and HTTP/HTTPS.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Identified unusual network behavior and potential security risks.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Documented findings and improved understanding of network communication and security monitoring.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Learned</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How to capture and filter packets for specific protocols.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Deep understanding of how TCP/IP, DNS, and DHCP work in practice.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How to spot anomalies in network traffic that indicate threats.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Importance of network monitoring in a SOC analyst role.
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

export default P4