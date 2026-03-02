import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ activeSection, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ["home", "about", "team", "projects"];

  const handleNav = (s) => {
    scrollTo(s);
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-logo">
        <div className="logo-icon">
          <FiMenu size={14} />
        </div>
        VISION<span>EERS</span>
      </div>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        {sections.map((s) => (
          <button
            key={s}
            className={`nav-link ${activeSection === s ? "active" : ""}`}
            onClick={() => handleNav(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </nav>
  );
}
