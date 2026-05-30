import { useNavigate } from 'react-router-dom'

function Projects() {
  const navigate = useNavigate()

  const projects = [
    {
      number: "Project 01",
      title: "Basic Security Monitoring & Threat Detection",
      desc: "Built a personal SOC home lab to simulate security monitoring and threat detection using Splunk, Wireshark, and Kali Linux.",
      tags: ["Splunk", "Wireshark", "Kali Linux"],
      route: "/p1"
    },
    {
      number: "Project 02",
      title: "Identity & Access Management IAM Simulation",
      desc: "Simulated IAM processes including user provisioning, RBAC implementation, and access reviews following least privilege principles.",
      tags: ["IAM", "RBAC", "Least Privilege"],
      route: "/p2"
    },
    {
      number: "Project 03",
      title: "Security Log Analyzer Using Python",
      desc: "Python tool to parse security logs, detect failed login attempts, and generate automated alerts for suspicious activity.",
      tags: ["Python", "Log Analysis", "Threat Detection"],
      route: "/p3"
    },
    {
      number: "Project 04",
      title: "Network Traffic Analysis Using Wireshark",
      desc: "Captured and analyzed network traffic to examine protocols like TCP, DNS, DHCP and identify unusual network behavior.",
      tags: ["Wireshark", "Packet Analysis", "TCP/IP"],
      route: "/p4"
    },
  ]

  return (
    <section id="projects" className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">
          What I built
        </p>

        <h2 className="text-5xl font-extrabold mb-10">
          My <span className="text-blue-500">Projects</span>
        </h2>

        <div className="border-t border-gray-800 mb-10 w-24"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.route}
              className="border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition flex flex-col justify-between gap-6"
            >
              <div>
                <p className="text-blue-400 text-xs font-mono tracking-widest mb-3">{p.number}</p>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((tag) => (
                    <span key={tag} className="border border-blue-900 text-blue-400 text-xs font-mono px-3 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(p.route)}
                  className="w-full border border-blue-600 text-blue-400 hover:bg-blue-900 font-semibold text-sm px-6 py-3 rounded-lg transition"
                >
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects