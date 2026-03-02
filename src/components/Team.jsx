import { teamData } from "../data/teamData";

export default function Team() {
  return (
    <section id="team">
      <div className="team-section">
        <div className="section-header">
          <div className="section-tag">Our Team</div>
          <h2 className="section-title">
            The <span>Crew</span>
          </h2>
        </div>
        <div className="team-grid">
          {teamData.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-avatar">
                <div
                  className="avatar-icon"
                  style={{ background: `linear-gradient(135deg, ${m.color}33, ${m.color})` }}
                >
                  {m.initials}
                </div>
              </div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-bio">{m.bio}</div>
                <div className="team-skills" style={{ marginTop: "12px" }}>
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="skill-chip"
                      style={{ borderColor: m.color + "44", color: m.color }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
