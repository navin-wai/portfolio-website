import Hero from "../components/Hero";

import SplashCursor from "../components/SplashCursor";

function Home() {
  return (
    <main className="home-page" id="home">
      <Hero />
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        PRESSURE_ITERATIONS={10}
        CURL={2}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        DYE_RESOLUTION={720}
        SIM_RESOLUTION={96}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#f6f6f7"
      />
      <nav className="hero-navigation" aria-label="Primary navigation">
        <a className="hero-navigation-link" href="#projects">
          Projects
        </a>
        <a className="hero-navigation-link" href="#skills">
          Skills
        </a>
        <a className="hero-navigation-link" href="#contact">
          Contact
        </a>
      </nav>
    </main>
  );
}

export default Home;
