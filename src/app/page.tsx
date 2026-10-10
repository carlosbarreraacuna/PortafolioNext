import { About } from "@/componentes/portfolio/About";
import { Career } from "@/componentes/portfolio/Career";
import { Contact } from "@/componentes/portfolio/Contact";
import { Footer } from "@/componentes/portfolio/Footer";
import { Hero } from "@/componentes/portfolio/Hero";
import { Navbar } from "@/componentes/portfolio/Navbar";
import { Services } from "@/componentes/portfolio/Services";
import { Stack } from "@/componentes/portfolio/Stack";
import { StoryBand } from "@/componentes/portfolio/StoryBand";
import { Work } from "@/componentes/portfolio/Work";

export default function Home() {
  return (
    <>
      <a href="#about" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <StoryBand index={0} />
        <About />
        <StoryBand index={1} />
        <Services />
        <StoryBand index={2} />
        <Career />
        <StoryBand index={3} />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
