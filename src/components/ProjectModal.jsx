import { useState, Fragment } from "react";
import { FiX, FiArrowRight, FiCamera } from "react-icons/fi";

const tabs = ["abstract", "flow", "components", "optimizations", "references", "photos"];

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("abstract");

  if (!project) return null;

  const IconComp = project.icon;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px" }}>
              <span style={{ fontSize: "32px", color: "var(--accent)", display: "flex" }}>
                <IconComp size={32} />
              </span>
              <div>
                <div className="modal-title">{project.name}</div>
                <div className="modal-subtitle">{project.desc}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
              {project.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`modal-tab ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="modal-content">
            {activeTab === "abstract" && (
              <>
                <h3>Abstract</h3>
                <p>{project.abstract}</p>
                <h3>Problem Statement</h3>
                <p>{project.problem}</p>
                <h3>Our Solution</h3>
                <p>{project.solution}</p>
              </>
            )}
            {activeTab === "flow" && (
              <>
                <h3>System Flow Diagram</h3>
                <div className="flow-diagram">
                  <div className="flow">
                    {project.flowNodes.map((node, i) => (
                      <Fragment key={i}>
                        <div className="flow-node">
                          <div className="flow-node-title">{node.title}</div>
                          <div className="flow-node-sub">{node.sub}</div>
                        </div>
                        {i < project.flowNodes.length - 1 && (
                          <div className="flow-arrow">
                            <FiArrowRight size={16} />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "12px" }}>
                  Data flows from hardware sensors through embedded processing, cloud/middleware, and
                  finally to the end-user interface.
                </p>
              </>
            )}
            {activeTab === "components" && (
              <>
                <h3>Components Used</h3>
                <div className="components-grid">
                  {project.components.map((c, i) => {
                    const CIcon = c.icon;
                    return (
                      <div key={i} className="component-card">
                        <div className="component-icon">
                          <CIcon size={22} />
                        </div>
                        <div className="component-name">{c.name}</div>
                        <div className="component-spec">{c.spec}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {activeTab === "optimizations" && (
              <>
                <h3>Optimizations &amp; Improvements</h3>
                <ul>
                  {project.optimizations.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === "references" && (
              <>
                <h3>References</h3>
                {project.references.map((r, i) => (
                  <div key={i} className="ref-item">
                    [{i + 1}] {r}
                  </div>
                ))}
              </>
            )}
            {activeTab === "photos" && (
              <>
                <h3>Project Photos</h3>
                {project.photos && project.photos.length > 0 ? (
                  <div className="photo-gallery">
                    {project.photos.map((photo, i) => (
                      <div key={i} className="photo-card">
                        <img src={photo.src} alt={photo.label} className="photo-img" />
                        <div className="photo-label">{photo.label}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: "12px", color: "var(--muted)" }}>
                      No project photos available yet.
                    </p>
                    <div className="photo-gallery">
                      {["Photo 1", "Photo 2", "Photo 3"].map((label, i) => (
                        <div key={i} className="photo-placeholder">
                          <span className="photo-icon"><FiCamera size={24} /></span>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
