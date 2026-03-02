import { FiArrowRight } from "react-icons/fi";
import { projectsData } from "../data/projectsData";

export default function Projects({ onOpenProject }) {
  return (
    <section id="projects">
      <div className="projects-section">
        <div className="section-header">
          <div className="section-tag">Lab</div>
          <h2 className="section-title">
            Our <span>Projects</span>
          </h2>
        </div>
        <div className="projects-list">
          {projectsData.map((p) => {
            const IconComp = p.icon;
            return (
              <div key={p.id} className="project-card" onClick={() => onOpenProject(p)}>
                <div className="project-icon">
                  <IconComp size={28} />
                </div>
                <div className="project-info">
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="project-arrow">
                  <FiArrowRight size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
