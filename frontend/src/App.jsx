import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

import "./App.css";

function App() {
  return (
    <div className="portfolio-page-shell">
      <Home />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
