import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #04050f;
    --bg2: #080c1a;
    --panel: #0d1128;
    --panel2: #111830;
    --accent: #00d4ff;
    --accent2: #7b2fff;
    --accent3: #ff6b35;
    --green: #00ff88;
    --text: #e8eaf6;
    --muted: #7b8cbf;
    --border: rgba(0,212,255,0.15);
    --glow: 0 0 20px rgba(0,212,255,0.3);
  }

  body { background: var(--bg); color: var(--text); font-family: 'Rajdhani', sans-serif; overflow-x: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* Circuit background */
  .circuit-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .circuit-bg::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,47,255,0.12) 0%, transparent 70%);
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 48px;
    background: rgba(4,5,15,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Orbitron', monospace; font-size: 20px; font-weight: 700;
    color: var(--accent); letter-spacing: 4px;
    display: flex; align-items: center; gap: 10px;
  }
  .nav-logo span { color: var(--accent2); }
  .logo-icon {
    width: 36px; height: 36px; border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    clip-path: polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%);
    background: rgba(0,212,255,0.1);
  }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link {
    font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 14px;
    letter-spacing: 2px; color: var(--muted); cursor: pointer; text-transform: uppercase;
    transition: color 0.3s; position: relative; padding-bottom: 4px; background: none; border: none;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
    background: var(--accent); transition: width 0.3s;
  }
  .nav-link:hover { color: var(--accent); }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: var(--accent); }
  .nav-link.active::after { width: 100%; }

  /* SECTIONS */
  section { position: relative; z-index: 1; min-height: 100vh; }

  /* HERO */
  .hero {
    display: flex; flex-direction: column; align-items: flex-start;
    justify-content: center; padding: 120px 48px 80px;
    min-height: 100vh;
  }
  .hero-eyebrow {
    font-family: 'Share Tech Mono', monospace; font-size: 12px;
    color: var(--accent); letter-spacing: 4px; text-transform: uppercase;
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  }
  .hero-eyebrow::before {
    content: ''; width: 40px; height: 1px; background: var(--accent);
  }
  .hero-title {
    font-family: 'Orbitron', monospace; font-size: clamp(42px, 7vw, 96px);
    font-weight: 900; line-height: 1; letter-spacing: -2px;
    margin-bottom: 8px;
  }
  .hero-title .line1 { color: var(--text); display: block; }
  .hero-title .line2 { color: transparent; -webkit-text-stroke: 1px var(--accent2); display: block; }
  .hero-subtitle {
    font-size: 22px; font-weight: 300; color: var(--muted); margin: 24px 0 48px;
    max-width: 560px; line-height: 1.6;
  }
  .hero-subtitle span { color: var(--accent); font-weight: 600; }
  .hero-cta {
    display: flex; gap: 16px; flex-wrap: wrap;
  }
  .btn-primary {
    padding: 14px 32px; background: var(--accent); color: #000;
    font-family: 'Orbitron', monospace; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer;
    clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
    transition: all 0.3s;
  }
  .btn-primary:hover { background: var(--green); transform: translateY(-2px); box-shadow: var(--glow); }
  .btn-secondary {
    padding: 14px 32px; background: transparent; color: var(--accent);
    font-family: 'Orbitron', monospace; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; border: 1px solid var(--accent); cursor: pointer;
    clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
    transition: all 0.3s;
  }
  .btn-secondary:hover { background: rgba(0,212,255,0.1); transform: translateY(-2px); }

  .hero-stats {
    display: flex; gap: 48px; margin-top: 80px;
    padding-top: 40px; border-top: 1px solid var(--border);
  }
  .stat { }
  .stat-num {
    font-family: 'Orbitron', monospace; font-size: 36px; font-weight: 700; color: var(--accent);
  }
  .stat-label { font-size: 13px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }

  /* SCANNING ANIMATION */
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.4; animation: scan 4s linear infinite;
    pointer-events: none;
  }
  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }

  /* SECTION HEADERS */
  .section-header { margin-bottom: 60px; }
  .section-tag {
    font-family: 'Share Tech Mono', monospace; font-size: 11px;
    color: var(--accent); letter-spacing: 4px; text-transform: uppercase;
    display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }
  .section-tag::before { content: '//'; color: var(--accent2); }
  .section-title {
    font-family: 'Orbitron', monospace; font-size: clamp(28px, 4vw, 52px);
    font-weight: 700; color: var(--text);
  }
  .section-title span { color: var(--accent); }

  /* ABOUT */
  .about-section { padding: 100px 48px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-text p {
    font-size: 17px; line-height: 1.8; color: var(--muted); margin-bottom: 20px;
  }
  .about-text p span { color: var(--text); font-weight: 600; }
  .tech-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
  .tech-tag {
    padding: 6px 16px; border: 1px solid var(--border);
    font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--accent);
    background: rgba(0,212,255,0.05);
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .about-visual {
    position: relative; display: flex; align-items: center; justify-content: center;
  }
  .hexagon-grid {
    display: grid; grid-template-columns: repeat(3, 80px); gap: 8px;
  }
  .hex {
    width: 80px; height: 80px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: var(--panel2); border: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-size: 24px; transition: all 0.3s; cursor: default;
  }
  .hex:hover { background: rgba(0,212,255,0.15); transform: scale(1.1); }
  .hex-label { font-size: 8px; color: var(--muted); text-align: center; margin-top: 4px; font-family: 'Share Tech Mono'; }

  /* TEAM */
  .team-section { padding: 100px 48px; background: linear-gradient(180deg, transparent 0%, rgba(8,12,26,0.5) 100%); }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  .team-card {
    background: var(--panel); border: 1px solid var(--border);
    padding: 0; overflow: hidden; transition: all 0.4s; position: relative;
    clip-path: polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%);
  }
  .team-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: linear-gradient(90deg, var(--accent2), var(--accent));
  }
  .team-card:hover { border-color: var(--accent); transform: translateY(-6px); box-shadow: var(--glow); }
  .team-card-img {
    width: 100%; height: 200px; object-fit: cover; object-position: top;
    background: linear-gradient(135deg, var(--panel2), #1a1040);
    display: flex; align-items: center; justify-content: center;
    font-size: 72px; color: var(--muted);
  }
  .team-avatar {
    width: 100%; height: 200px;
    background: linear-gradient(135deg, var(--panel2) 0%, #1a0a2e 100%);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .team-avatar::after {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px
    );
  }
  .avatar-icon {
    width: 100px; height: 100px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', monospace; font-size: 36px; font-weight: 700; color: #fff;
    z-index: 1; position: relative;
    box-shadow: 0 0 40px rgba(0,212,255,0.4);
  }
  .team-info { padding: 24px; }
  .team-name {
    font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 700;
    color: var(--text); margin-bottom: 8px;
  }
  .team-role { font-size: 13px; color: var(--accent); letter-spacing: 1px; margin-bottom: 12px; }
  .team-skills { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-chip {
    padding: 3px 10px; background: rgba(123,47,255,0.15); border: 1px solid rgba(123,47,255,0.3);
    font-family: 'Share Tech Mono', monospace; font-size: 10px; color: var(--accent2);
    border-radius: 2px;
  }
  .team-bio { font-size: 13px; color: var(--muted); line-height: 1.6; margin-top: 10px; }

  /* PROJECTS */
  .projects-section { padding: 100px 48px; }
  .projects-list { display: flex; flex-direction: column; gap: 24px; }
  .project-card {
    background: var(--panel); border: 1px solid var(--border);
    padding: 32px; display: flex; align-items: center; gap: 32px;
    cursor: pointer; transition: all 0.4s; position: relative; overflow: hidden;
    clip-path: polygon(0 0, 98% 0, 100% 4%, 100% 100%, 2% 100%, 0 96%);
  }
  .project-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, var(--accent), var(--accent2));
  }
  .project-card:hover { border-color: var(--accent); transform: translateX(8px); box-shadow: -4px 0 20px rgba(0,212,255,0.2); }
  .project-icon {
    width: 80px; height: 80px; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,255,0.1));
    border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
    font-size: 36px;
    clip-path: polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%);
  }
  .project-info { flex: 1; }
  .project-name {
    font-family: 'Orbitron', monospace; font-size: 22px; font-weight: 700;
    color: var(--text); margin-bottom: 8px;
  }
  .project-desc { font-size: 15px; color: var(--muted); line-height: 1.6; }
  .project-tags { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .project-tag {
    padding: 4px 12px; background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2);
    font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--accent);
  }
  .project-arrow {
    font-size: 24px; color: var(--accent); transition: transform 0.3s;
    font-family: monospace;
  }
  .project-card:hover .project-arrow { transform: translateX(6px); }

  /* PROJECT MODAL */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(4,5,15,0.97); backdrop-filter: blur(20px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: 80px 24px 24px; overflow-y: auto;
  }
  .modal {
    width: 100%; max-width: 900px;
    background: var(--panel); border: 1px solid var(--border);
    clip-path: polygon(0 0, 97% 0, 100% 3%, 100% 100%, 3% 100%, 0 97%);
    position: relative;
  }
  .modal-header {
    padding: 40px 48px 32px; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; justify-content: space-between;
    background: linear-gradient(90deg, rgba(0,212,255,0.05), transparent);
  }
  .modal-title {
    font-family: 'Orbitron', monospace; font-size: 32px; font-weight: 700; color: var(--text);
    margin-bottom: 8px;
  }
  .modal-subtitle { font-size: 16px; color: var(--accent); }
  .modal-close {
    width: 40px; height: 40px; background: rgba(255,255,255,0.05);
    border: 1px solid var(--border); color: var(--text); font-size: 20px;
    cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
  }
  .modal-close:hover { background: rgba(255,107,53,0.2); border-color: var(--accent3); color: var(--accent3); }
  .modal-body { padding: 40px 48px; }
  .modal-tabs {
    display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 40px;
    overflow-x: auto;
  }
  .modal-tab {
    padding: 12px 24px; font-family: 'Share Tech Mono', monospace; font-size: 12px;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted); cursor: pointer;
    border-bottom: 2px solid transparent; transition: all 0.3s; white-space: nowrap; background: none; border-top: none; border-left: none; border-right: none;
  }
  .modal-tab:hover { color: var(--accent); }
  .modal-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .modal-content h3 {
    font-family: 'Orbitron', monospace; font-size: 18px; font-weight: 600;
    color: var(--accent); margin-bottom: 16px; margin-top: 32px;
  }
  .modal-content h3:first-child { margin-top: 0; }
  .modal-content p { font-size: 15px; color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
  .modal-content ul { list-style: none; margin-bottom: 16px; }
  .modal-content ul li {
    padding: 8px 0; padding-left: 20px; position: relative;
    font-size: 15px; color: var(--muted); line-height: 1.6;
  }
  .modal-content ul li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }

  /* FLOW DIAGRAM */
  .flow-diagram {
    background: var(--bg2); border: 1px solid var(--border);
    padding: 32px; margin: 24px 0; overflow-x: auto;
  }
  .flow {
    display: flex; align-items: center; gap: 0; min-width: 600px; flex-wrap: nowrap;
  }
  .flow-node {
    padding: 14px 20px; background: rgba(0,212,255,0.08); border: 1px solid var(--accent);
    text-align: center; flex-shrink: 0; min-width: 110px;
    clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%);
  }
  .flow-node-title { font-family: 'Orbitron', monospace; font-size: 11px; color: var(--accent); font-weight: 600; }
  .flow-node-sub { font-size: 10px; color: var(--muted); margin-top: 4px; font-family: 'Share Tech Mono'; }
  .flow-arrow { color: var(--accent); font-size: 20px; padding: 0 8px; flex-shrink: 0; }

  /* COMPONENTS GRID */
  .components-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin: 24px 0; }
  .component-card {
    background: var(--bg2); border: 1px solid var(--border);
    padding: 20px; transition: all 0.3s;
  }
  .component-card:hover { border-color: var(--accent2); }
  .component-icon { font-size: 28px; margin-bottom: 10px; }
  .component-name { font-family: 'Orbitron', monospace; font-size: 13px; color: var(--text); margin-bottom: 4px; }
  .component-spec { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--accent2); }

  /* REFS */
  .ref-item {
    padding: 12px 16px; border-left: 2px solid var(--accent2);
    background: rgba(123,47,255,0.05); margin-bottom: 10px;
    font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--accent2);
  }

  /* PHOTO GALLERY */
  .photo-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0; }
  .photo-placeholder {
    aspect-ratio: 4/3; background: linear-gradient(135deg, var(--panel2), #0a1535);
    border: 1px solid var(--border); display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
    font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--muted);
  }
  .photo-placeholder span { font-size: 32px; }

  /* FOOTER */
  footer {
    padding: 60px 48px 40px; border-top: 1px solid var(--border);
    background: var(--bg2); position: relative; z-index: 1;
  }
  .footer-content { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 40px; }
  .footer-logo { font-family: 'Orbitron', monospace; font-size: 24px; font-weight: 700; color: var(--accent); }
  .footer-tagline { font-size: 14px; color: var(--muted); margin-top: 8px; }
  .footer-links { display: flex; flex-direction: column; gap: 10px; }
  .footer-link { font-size: 14px; color: var(--muted); cursor: pointer; transition: color 0.3s; background: none; border: none; text-align: left; }
  .footer-link:hover { color: var(--accent); }
  .footer-bottom {
    margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
  }
  .footer-copy { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--muted); }

  /* STATUS INDICATORS */
  .status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--green);
    display: inline-block; margin-right: 8px;
    box-shadow: 0 0 8px var(--green); animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    .nav-links { gap: 16px; }
    .nav-link { font-size: 12px; }
    .hero { padding: 100px 24px 60px; }
    .about-section, .team-section, .projects-section { padding: 80px 24px; }
    .about-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 24px; }
    .modal-body { padding: 24px; }
    .modal-header { padding: 24px; }
    .photo-gallery { grid-template-columns: repeat(2, 1fr); }
    footer { padding: 40px 24px; }
  }
`;

const teamData = [
  {
    name: "Jeeva",
    initials: "J",
    role: "Electronics Lead & ROS2 Engineer",
    skills: ["ROS2", "Electronics", "C++", "Python"],
    bio: "Specializes in robot middleware integration and embedded electronics design. Leads the ROS2 architecture and sensor fusion pipelines.",
    color: "#00d4ff",
  },
  {
    name: "Madhunalan",
    initials: "M",
    role: "Electronics & Design Engineer",
    skills: ["Electronics", "PCB Design", "UI/UX", "CAD"],
    bio: "Bridges hardware and aesthetics — designs electronic systems while crafting the visual identity of every project.",
    color: "#7b2fff",
  },
  {
    name: "Mahesh Babu",
    initials: "MB",
    role: "Electronics & Design Engineer",
    skills: ["Electronics", "Design", "Prototyping", "3D Print"],
    bio: "Expert in rapid prototyping and hardware integration. Turns ideas into working electronic prototypes with elegant design.",
    color: "#ff6b35",
  },
  {
    name: "Matesh",
    initials: "MT",
    role: "Design & ROS2 Developer",
    skills: ["ROS2", "Design", "Simulation", "SLAM"],
    bio: "Combines robotics software development with visual design thinking. Leads simulation environments and SLAM implementations.",
    color: "#00ff88",
  },
];

const projectsData = [
  {
    id: 1,
    icon: "🅿️",
    name: "Smart Park",
    desc: "An intelligent parking management application that uses IoT sensors and real-time data to streamline parking slot discovery and reservation.",
    tags: ["Flutter", "IoT", "Firebase", "ESP32"],
    abstract: "Smart Park is a next-generation parking solution that combines embedded IoT sensor networks with a cross-platform mobile application built in Flutter. The system enables real-time monitoring of parking slot availability, reducing urban congestion and improving the driver experience through instant slot detection and guided navigation.",
    problem: "Urban parking inefficiency costs drivers significant time and contributes to pollution from vehicles circling for spots. Traditional parking systems lack real-time feedback and digital integration.",
    solution: "A distributed sensor network (IR + ultrasonic) per slot communicates slot status via ESP32 microcontrollers to a Firebase Realtime Database. The Flutter app renders an interactive map with live slot status, enabling reservations and turn-by-turn guidance to available slots.",
    flowNodes: [
      { title: "Sensor Array", sub: "IR + Ultrasonic" },
      { title: "ESP32 MCU", sub: "Edge Processing" },
      { title: "Firebase", sub: "Realtime DB" },
      { title: "Flutter App", sub: "Mobile UI" },
      { title: "User", sub: "Navigation" },
    ],
    components: [
      { icon: "📡", name: "ESP32-WROOM", spec: "Dual-core 240MHz" },
      { icon: "👁️", name: "IR Sensor", spec: "E18-D80NK" },
      { icon: "🔊", name: "HC-SR04", spec: "Ultrasonic Range" },
      { icon: "🔋", name: "LM7805", spec: "5V Regulator" },
      { icon: "📱", name: "Flutter SDK", spec: "Cross-platform" },
      { icon: "🔥", name: "Firebase", spec: "Realtime DB + Auth" },
      { icon: "📍", name: "Google Maps", spec: "Navigation API" },
      { icon: "☁️", name: "Cloud Func", spec: "Backend Logic" },
    ],
    optimizations: [
      "Debounce filtering on sensors to reduce false triggers",
      "MQTT over HTTP for 3x faster sensor-to-cloud latency",
      "Local caching in Flutter for offline slot map display",
      "Batch database writes to reduce Firebase read/write costs",
      "Adaptive polling rate — increases frequency when slots are nearly full",
    ],
    references: [
      "Flutter Documentation – flutter.dev",
      "Firebase Realtime Database Guide – firebase.google.com",
      "ESP32 Technical Reference Manual – espressif.com",
      "IEEE: IoT-based Smart Parking Systems (2023)",
      "Ultrasonic Distance Measurement with HC-SR04 – Adafruit",
    ],
  },
  {
    id: 2,
    icon: "🤖",
    name: "ROS2 Autonomous Bot",
    desc: "A differential-drive robot with SLAM navigation, obstacle avoidance, and a ROS2-based modular software stack.",
    tags: ["ROS2", "LIDAR", "Python", "C++", "SLAM"],
    abstract: "An autonomous mobile robot built on the ROS2 Humble framework, capable of mapping unknown environments using SLAM (Simultaneous Localization and Mapping) and navigating autonomously using the Nav2 stack. The robot features a custom differential drive base, integrated LIDAR, and a Raspberry Pi 4 as the onboard computer.",
    problem: "Research-grade autonomous robots are expensive and inaccessible. Teams need an open-source, extensible platform for testing navigation algorithms without spending thousands on commercial solutions.",
    solution: "A custom-built differential drive robot running ROS2 Humble on a Raspberry Pi 4. LIDAR data feeds into the SLAM Toolbox for real-time mapping. Nav2 handles path planning using Dijkstra and DWA algorithms. A custom motor driver interface bridges ROS2 commands to the physical hardware.",
    flowNodes: [
      { title: "LIDAR", sub: "RPLiDAR A1" },
      { title: "SLAM", sub: "Map Building" },
      { title: "Nav2 Stack", sub: "Path Planning" },
      { title: "ROS2 Node", sub: "cmd_vel" },
      { title: "Motor Driver", sub: "L298N" },
    ],
    components: [
      { icon: "🥧", name: "Raspberry Pi 4", spec: "4GB RAM" },
      { icon: "🔄", name: "RPLiDAR A1", spec: "360° 12m range" },
      { icon: "⚙️", name: "L298N Driver", spec: "Dual H-Bridge" },
      { icon: "🔋", name: "LiPo 3S", spec: "11.1V 5000mAh" },
      { icon: "📡", name: "IMU MPU6050", spec: "6-DOF" },
      { icon: "🖥️", name: "ROS2 Humble", spec: "Nav2 + SLAM" },
      { icon: "🐍", name: "Python 3.10", spec: "Node Scripts" },
      { icon: "⚡", name: "C++ Drivers", spec: "Motor Interface" },
    ],
    optimizations: [
      "Adaptive scan rate for LIDAR based on robot velocity",
      "Costmap inflation radius tuned for differential drive geometry",
      "Custom PID controller for wheel odometry accuracy",
      "Compressed image transport for reduced ROS2 bandwidth",
      "Lifecycle node management to reduce CPU during idle states",
    ],
    references: [
      "ROS2 Humble Documentation – docs.ros.org",
      "Nav2 – Navigation2 Stack – navigation.ros.org",
      "SLAM Toolbox – github.com/SteveMacenski/slam_toolbox",
      "RPLiDAR SDK – slamtec.com",
      "Probabilistic Robotics – Thrun, Burgard, Fox (2005)",
    ],
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("abstract");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "team", "projects"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openProject = (p) => {
    setSelectedProject(p);
    setActiveTab("abstract");
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const tabs = ["abstract", "flow", "components", "optimizations", "references", "photos"];

  return (
    <>
      <style>{styles}</style>
      <div className="circuit-bg" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <div className="logo-icon">⊳</div>
          VISION<span>EERS</span>
        </div>
        <div className="nav-links">
          {["home", "about", "team", "projects"].map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero">
          <div className="scan-line" />
          <div className="hero-eyebrow">
            <span className="status-dot" />
            System Online · ROS2 Active · Perundurai, Tamil Nadu
          </div>
          <h1 className="hero-title">
            <span className="line1">We Are</span>
            <span className="line2">Visioneers</span>
          </h1>
          <p className="hero-subtitle">
            A team of <span>four engineers</span> who build electronics, robots, and software. We perform only under pressure —{" "}
            <span>because we procrastinate a lot.</span>
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-secondary" onClick={() => scrollTo("team")}>Meet the Team</button>
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

      {/* ABOUT */}
      <section id="about">
        <div className="about-section">
          <div className="section-header">
            <div className="section-tag">About Us</div>
            <h2 className="section-title">Four Nerds. <span>One Vision.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                We are <span>Visioneers</span> — a student engineering team from Perundurai, Tamil Nadu, specializing in robotics, embedded electronics, and software development.
              </p>
              <p>
                Our projects span from <span>IoT-based smart systems</span> to fully autonomous <span>ROS2-powered robots</span>. We combine hardware design with modern software stacks to build things that actually work.
              </p>
              <p>
                Yes, we procrastinate. But when the deadline hits — we deliver. Every. Single. Time.
              </p>
              <div className="tech-tags">
                {["ROS2 Humble", "Flutter", "ESP32", "Raspberry Pi", "SLAM", "Nav2", "Firebase", "PCB Design", "Python", "C++"].map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="about-visual">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div className="hexagon-grid">
                  {["🤖", "⚡", "📡", "🔧", "💻", "🔬", "📱", "🛠️", "🎯"].map((e, i) => (
                    <div key={i} className="hex">
                      <div style={{ fontSize: "28px", zIndex: 1 }}>{e}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "var(--muted)", marginTop: "16px", letterSpacing: "3px" }}>TECH STACK</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="team-section">
          <div className="section-header">
            <div className="section-tag">Our Team</div>
            <h2 className="section-title">The <span>Crew</span></h2>
          </div>
          <div className="team-grid">
            {teamData.map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">
                  <div className="avatar-icon" style={{ background: `linear-gradient(135deg, ${m.color}33, ${m.color})` }}>
                    {m.initials}
                  </div>
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-bio">{m.bio}</div>
                  <div className="team-skills" style={{ marginTop: "14px" }}>
                    {m.skills.map(s => (
                      <span key={s} className="skill-chip" style={{ borderColor: m.color + "44", color: m.color }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-section">
          <div className="section-header">
            <div className="section-tag">Lab</div>
            <h2 className="section-title">Our <span>Projects</span></h2>
          </div>
          <div className="projects-list">
            {projectsData.map((p) => (
              <div key={p.id} className="project-card" onClick={() => openProject(p)}>
                <div className="project-icon">{p.icon}</div>
                <div className="project-info">
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
                <div className="project-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div>
            <div className="footer-logo">VISIONEERS</div>
            <div className="footer-tagline">
              <span className="status-dot" />
              Performing under pressure since day one.
            </div>
          </div>
          <div className="footer-links">
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "var(--accent)", letterSpacing: "2px", marginBottom: "12px" }}>NAVIGATE</div>
            {["home", "about", "team", "projects"].map(s => (
              <button key={s} className="footer-link" onClick={() => scrollTo(s)}>{s.toUpperCase()}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "var(--accent)", letterSpacing: "2px", marginBottom: "12px" }}>STACK</div>
            {["ROS2 Humble", "Flutter", "Firebase", "ESP32", "RPLiDAR"].map(s => (
              <div key={s} style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "6px" }}>{s}</div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 VISIONEERS · PERUNDURAI, TN, INDIA</div>
          <div className="footer-copy">BUILT WITH 🤖 + ☕ + PROCRASTINATION</div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeProject()}>
          <div className="modal">
            <div className="modal-header">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "40px" }}>{selectedProject.icon}</span>
                  <div>
                    <div className="modal-title">{selectedProject.name}</div>
                    <div className="modal-subtitle">{selectedProject.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                  {selectedProject.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
              <button className="modal-close" onClick={closeProject}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-tabs">
                {tabs.map(t => (
                  <button key={t} className={`modal-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="modal-content">
                {activeTab === "abstract" && (
                  <>
                    <h3>Abstract</h3>
                    <p>{selectedProject.abstract}</p>
                    <h3>Problem Statement</h3>
                    <p>{selectedProject.problem}</p>
                    <h3>Our Solution</h3>
                    <p>{selectedProject.solution}</p>
                  </>
                )}
                {activeTab === "flow" && (
                  <>
                    <h3>System Flow Diagram</h3>
                    <div className="flow-diagram">
                      <div className="flow">
                        {selectedProject.flowNodes.map((node, i) => (
                          <>
                            <div key={i} className="flow-node">
                              <div className="flow-node-title">{node.title}</div>
                              <div className="flow-node-sub">{node.sub}</div>
                            </div>
                            {i < selectedProject.flowNodes.length - 1 && (
                              <div className="flow-arrow" key={`arrow-${i}`}>→</div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "16px" }}>
                      Data flows from hardware sensors through embedded processing, cloud/middleware, and finally to the end-user interface.
                    </p>
                  </>
                )}
                {activeTab === "components" && (
                  <>
                    <h3>Components Used</h3>
                    <div className="components-grid">
                      {selectedProject.components.map((c, i) => (
                        <div key={i} className="component-card">
                          <div className="component-icon">{c.icon}</div>
                          <div className="component-name">{c.name}</div>
                          <div className="component-spec">{c.spec}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {activeTab === "optimizations" && (
                  <>
                    <h3>Optimizations & Improvements</h3>
                    <ul>
                      {selectedProject.optimizations.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </>
                )}
                {activeTab === "references" && (
                  <>
                    <h3>References</h3>
                    {selectedProject.references.map((r, i) => (
                      <div key={i} className="ref-item">[{i + 1}] {r}</div>
                    ))}
                  </>
                )}
                {activeTab === "photos" && (
                  <>
                    <h3>Project Photos</h3>
                    <p style={{ fontSize: "13px", color: "var(--muted)" }}>Project documentation photos — add your own images here.</p>
                    <div className="photo-gallery">
                      {["Prototype v1", "Circuit Board", "Testing Phase", "Assembly", "Final Demo", "Team at Work"].map((label, i) => (
                        <div key={i} className="photo-placeholder">
                          <span>{["📷", "🔌", "🧪", "🔧", "🎯", "👥"][i]}</span>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
