import navinImage from "../assets/navin.png";
import "./Hero.css";

function Hero() {
  return (
    <main className="hero">
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
        </div>
      </div>
    </main>
  );
}

export default Hero;
