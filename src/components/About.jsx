import {
  FiCpu, FiMonitor, FiTool, FiGrid, FiSettings, FiTarget,
  FiSmartphone, FiZap, FiActivity,
} from "react-icons/fi";

const hexIcons = [
  { Icon: FiCpu, label: "MCU" },
  { Icon: FiZap, label: "Power" },
  { Icon: FiActivity, label: "Build" },
  { Icon: FiGrid, label: "PCB" },
  { Icon: FiMonitor, label: "Software" },
  { Icon: FiTool, label: "Hardware" },
  { Icon: FiSmartphone, label: "Mobile" },
  { Icon: FiSettings, label: "Config" },
  { Icon: FiTarget, label: "Deploy" },
];

const techTags = [
  "ROS2 Humble", "Flutter", "ESP32", "Raspberry Pi",
  "SLAM", "Nav2", "Firebase", "PCB Design", "Python", "C++",
];

export default function About() {
  return (
    <section id="about">
      <div className="about-section">
        <div className="section-header">
          <div className="section-tag">About Us</div>
          <h2 className="section-title">
            Four Nerds. <span>One Vision.</span>
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              We are <span>Visioneers</span> — a student engineering team from Perundurai, Tamil
              Nadu, specializing in robotics, embedded electronics, and software development.
            </p>
            <p>
              Our projects span from <span>IoT-based smart systems</span> to fully autonomous{" "}
              <span>ROS2-powered robots</span>. We combine hardware design with modern software
              stacks to build things that actually work.
            </p>
            <p>Yes, we procrastinate. But when the deadline hits — we deliver. Every. Single. Time.</p>
            <div className="tech-tags">
              {techTags.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div className="hexagon-grid">
                {hexIcons.map(({ Icon }, i) => (
                  <div key={i} className="hex">
                    <div className="hex-icon">
                      <Icon size={22} />
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "11px",
                  color: "var(--muted)",
                  marginTop: "12px",
                  letterSpacing: "3px",
                }}
              >
                TECH STACK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
