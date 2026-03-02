import { FiCpu, FiCode, FiCoffee } from "react-icons/fi";

export default function Footer({ scrollTo }) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-content">
          <div>
            <div className="footer-logo">VISIONEERS</div>
            <div className="footer-tagline">
              <span className="status-dot" />
              Performing under pressure since day one.
            </div>
          </div>
          <div className="footer-links">
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                color: "var(--accent)",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              NAVIGATE
            </div>
            {["home", "about", "team", "projects"].map((s) => (
              <button key={s} className="footer-link" onClick={() => scrollTo(s)}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                color: "var(--accent)",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              STACK
            </div>
            {["ROS2 Humble", "Flutter", "Firebase", "ESP32", "RPLiDAR"].map((s) => (
              <div key={s} style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "5px" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">&copy; 2026 VISIONEERS &middot; COIMBATORE, TN, INDIA</div>
          <div className="footer-built">
            BUILT WITH <FiCpu size={13} /> + <FiCoffee size={13} /> + PROCRASTINATION
          </div>
        </div>
      </div>
    </footer>
  );
}
