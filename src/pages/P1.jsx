import { useNavigate } from 'react-router-dom'

function P1() {
    const navigate = useNavigate()

    return (
        <div className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => navigate('/')}
                    className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition flex items-center gap-2"
                >
                    Back to Portfolio
                </button>

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
                    Project 01
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Basic Security Monitoring <br />
                    <span className="text-blue-500">& Threat Detection</span>
                </h1>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg"> Incident Reporting</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Security Monitoring</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Log Analysis</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Threat Detection</span>
                </div>

                <div className="flex flex-col gap-10">

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Overview</h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            Built a personal SOC home lab environment to simulate real-world
                            security monitoring and basic threat detection. The goal was to
                            understand how a SOC analyst detects, investigates, and responds
                            to security events in a controlled environment.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Did</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Set up VirtualBox with Kali Linux and Windows virtual machines to simulate attacker and target systems.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Installed and configured Splunk free tier to collect and analyze system logs.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Used Wireshark to capture and inspect network traffic during simulated attacks.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Created basic Splunk alerts to detect suspicious login attempts and port scans.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Documented findings and practiced writing basic incident reports.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Learned</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How to read and correlate logs to identify suspicious activity.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Basics of SIEM tools and how alerts are configured.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Network traffic analysis and identifying IOCs in packet captures.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Importance of documentation in incident response workflows.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Status</h2>
                        <span className="border border-green-700 text-green-400 text-sm font-mono px-4 py-2 rounded-lg">
                            In Progress
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default P1