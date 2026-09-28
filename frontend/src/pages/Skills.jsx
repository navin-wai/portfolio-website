import "./Skills.css";
import TechText from "../components/TechText";

const skillGroups = [
  [
    "React.js",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux Toolkit",
    "React Query",
    "Framer Motion",
    "Responsive Design",
    "UI/UX Implementation",
  ],
  [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT",
    "OAuth 2.0",
    "Socket.io",
    "Redis",
    "WebSockets",
    "PostgreSQL",
    "API Security",
    "Server-Side Architecture",
  ],
  [
    "MERN Stack",
    "REST APIs",
    "Authentication & Authorization",
    "API Integration",
    "Git & GitHub",
    "Docker",
    "CI/CD",
    "Testing & Debugging",
    "System Design",
    "Performance Optimization",
    "Agile Development",
    "Deployment & Hosting",
  ],
];

const skillGroupTitles = ["Frontend", "Backend", "Development"];

function Skills() {
  return (
    <main className="skills-page" id="skills">
      <div className="skills-heading">
        <div className="skills-heading-canvas">
          <TechText
            text="Skills"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            fontFamily=""
            color="#ffffff"
            accentColor="#ffffff"
            letterSpacing={-0.05}
            reach={200}
            softness={0.7}
            strokeWidth={1.5}
            speed={1}
            lineStyle="dashed"
            selection
            labels
            draggable
            sweep
          />
        </div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <div key={index} className="skills-group">
            <h3>{skillGroupTitles[index]}</h3>
            <div className="skills-list">
              {group.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Skills;
