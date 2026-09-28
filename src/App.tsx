import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Skills } from "./components/Skills";
import { Work } from "./components/Work";

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-void text-paper">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-snow px-4 py-2.5 text-md font-medium text-ink transition-transform duration-150 ease-out focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
