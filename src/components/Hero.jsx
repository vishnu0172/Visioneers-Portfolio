export default function Hero({ scrollTo }) {
  return (
    <section id="home">
      <div className="hero">
        <div className="scan-line" />
        <div className="hero-eyebrow">
          <span className="status-dot" />
          System Online &middot; ROS2 Active &middot; Coimbatore, Tamil Nadu
        </div>
        <h1 className="hero-title">
          <span className="line1">We Are</span>
          <span className="line2">Visioneers</span>
        </h1>
        <p className="hero-subtitle">
          A team of <span>four engineers</span> who build electronics, robots, and software. We
          perform only under pressure &mdash; <span>because we procrastinate a lot.</span>
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => scrollTo("projects")}>
            View Projects
          </button>
          <button className="btn-secondary" onClick={() => scrollTo("team")}>
            Meet the Team
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">4</div>
            <div className="stat-label">Engineers</div>
          </div>
          <div className="stat">
            <div className="stat-num">2+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num">ROS2</div>
            <div className="stat-label">Framework</div>
          </div>
          <div className="stat">
            <div className="stat-num">IoT</div>
            <div className="stat-label">Specialty</div>
          </div>
        </div>
      </div>
    </section>
  );
}
