import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToHashOnLoad from "@/components/ScrollToHashOnLoad";

export default function Home() {
  return (
    <>
      <ScrollToHashOnLoad />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
