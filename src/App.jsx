import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Sponsors from "./components/Sponsors";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features id="events" />
      <Sponsors id="sponsors" />
      <Story />
      <Contact id="contact" />
      <Footer />
    </main>
  );
}

export default App;
