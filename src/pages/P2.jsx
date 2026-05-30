import { useNavigate } from 'react-router-dom'

function P2() {
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

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">Project 02</p>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Identity & Access Management <br />
                    <span className="text-blue-500">IAM Simulation</span>
                </h1>

                <div className="border-t border-gray-800 mb-10 w-24"></div>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">IAM</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">RBAC</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">Least Privilege</span>
                    <span className="border border-blue-700 text-blue-300 text-sm font-mono px-4 py-2 rounded-lg">User Provisioning</span>
                </div>

                <div className="flex flex-col gap-10">

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">Overview</h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            Simulated an Identity and Access Management environment to understand
                            how organizations manage user identities, roles, and permissions following
                            security best practices like least privilege and RBAC.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Did</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Simulated user provisioning and de-provisioning processes for employees.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Implemented Role-Based Access Control (RBAC) to assign permissions based on job roles.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Managed user accounts, roles, and access permissions following least-privilege principles.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Generated access review reports to support security and compliance requirements.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-blue-400 text-sm font-mono tracking-widest mb-4">What I Learned</h2>
                        <ul className="flex flex-col gap-3 text-gray-300 text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How IAM systems control access across an organization.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Importance of least privilege in reducing attack surface.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                How RBAC simplifies permission management at scale.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">→</span>
                                Access review processes used in compliance workflows.
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

export default P2