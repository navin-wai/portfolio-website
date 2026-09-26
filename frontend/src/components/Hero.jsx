import { useRef } from "react";
import navinImage from "../assets/navin.png";
import "./Hero.css";

function Hero() {
  const heroRef = useRef(null);

  const handlePointerMove = (event) => {
    const hero = heroRef.current;
    if (!hero) return;

    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    hero.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
    hero.classList.add("is-pointer-active");
  };

  const handlePointerLeave = () => {
    heroRef.current?.classList.remove("is-pointer-active");
  };

  return (
    <main
      className="hero"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img className="hero-image" src={navinImage} alt="Navin Image" />
      <div className="hero-content">
        <p className="hero-title">@ Code With Navin</p>
        <p className="hero-description">
          Passionate Full Stack Developer dedicated to building innovative
          solutions and exceptional digital experiences through modern
          technologies, clean code, and scalable architectures.
        </p>
        <div className="hero-bottom">
          <div
            className="hero-marquee"
            aria-label="Full Stack Developer and Software Engineer"
          >
            <div className="hero-marquee-track">
              <span>Full Stack Developer &amp; Software Engineer</span>
              <span aria-hidden="true">
                Full Stack Developer &amp; Software Engineer
              </span>
            </div>
          </div>
          <nav>
            <div className="hero-navigation">
              <a href="#/contact" className="hero-navigation-link">
                Contact
              </a>
              <a href="#/projects" className="hero-navigation-link">
                Projects
              </a>
              <a href="#/skills" className="hero-navigation-link">
                Skills
              </a>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default Hero;
