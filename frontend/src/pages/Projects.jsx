import "./Projects.css";
import { Link } from "react-router-dom";
import TextPressure from "../components/TextPressure";
import BlogifyImg from "../assets/blogify.png";
import NaviExpense from "../assets/NaviExpense.png";
import TypeShiftPro from "../assets/TypeShiftPro.png";
import todoform from "../assets/todoform.png";

function Projects() {
  return (
    <main className="projects-page">
      <div className="projects-heading">
        <TextPressure
          text="Projects!"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#ffffff"
          minFontSize={36}
        />
      </div>
      <div className="projects-back-wrapper">
        <Link className="projects-back-link" to="/">
          Back
        </Link>
      </div>
      <div className="projects-grid">
        <article className="project-card">
          <div className="project-image-wrapper">
            <img src={BlogifyImg} alt="Blogify project preview" />
          </div>
          <h2>Blogify</h2>
          <p>
            Developed a blogging platform using Node.js, Express, MongoDB, and
            EJS with JWT-based authentication, blog publishing, image uploads
            through Cloudinary, and interactive commenting functionality.
          </p>
          <a href="https://blogify-mpfb.onrender.com/" target="_blank">
            Go To Website
          </a>
          <a href="https://github.com/navin-wai/BlogiFy" target="_blank">
            Github
          </a>
        </article>
        <article className="project-card">
          <div className="project-image-wrapper">
            <img src={NaviExpense} alt="NaviExpense project preview" />
          </div>
          <h2>NaviExpense</h2>
          <p>
            NaviExpense is a full-stack personal finance tracker that helps
            users record income and expenses, monitor monthly balances, and
            understand spending by category. Users can create accounts, securely
            log in, add transactions, delete records, and view a personalized
            financial dashboard.
          </p>
          <a href="https://naviexpense.onrender.com/" target="_blank">
            Go To Website
          </a>
          <a href="https://github.com/navin-wai/naviExpense" target="_blank">
            Github
          </a>
        </article>
        <article className="project-card">
          <div className="project-image-wrapper">
            <img src={TypeShiftPro} alt="TypeShiftPro project preview" />
          </div>
          <h2>TypeShiftPro</h2>
          <p>
            A lightweight, offline typing test built for responsiveness. Upload
            your own text or run a random book-style passage and track time,
            WPM, and accuracy with zero typing lag.
          </p>
          <a href="https://typeshiftpro.netlify.app/index.html" target="_blank">
            Go To Website
          </a>
          <a href="https://github.com/navin-wai/TypeShiftPro" target="_blank">
            Github
          </a>
        </article>
        <article className="project-card">
          <div className="project-image-wrapper">
            <img src={todoform} alt="Todoform project preview" />
          </div>
          <h2>todoform</h2>
          <p>
            A clean, fast, and stylish to-do app that transforms everyday task
            management into a smooth, intuitive productivity experience.,
            Personalized task workspaces, priority-based todos, completion
            tracking, search, filtering, sorting, and seamless task management.
          </p>
          <a href="https://todo-app-zphf.onrender.com/" target="_blank">
            Go To Website
          </a>
          <a href="https://github.com/navin-wai/todo-app" target="_blank">
            Github
          </a>
        </article>
      </div>
      <div className="projects-all-wrapper">
        <a
          className="projects-all-link"
          href="https://github.com/navin-wai?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          View All Projects
        </a>
      </div>
    </main>
  );
}

export default Projects;
