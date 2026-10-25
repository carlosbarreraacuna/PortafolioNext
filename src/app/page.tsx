import { About } from "@/componentes/portfolio/About";
import { Career } from "@/componentes/portfolio/Career";
import { Contact } from "@/componentes/portfolio/Contact";
import { Footer } from "@/componentes/portfolio/Footer";
import { Hero } from "@/componentes/portfolio/Hero";
import { Navbar } from "@/componentes/portfolio/Navbar";
import { PictureBand } from "@/componentes/portfolio/PictureBand";
import { Services } from "@/componentes/portfolio/Services";
import { Stack } from "@/componentes/portfolio/Stack";
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
        <About />
        <PictureBand scene="arch" />
        <Services />
        <Work />
        <PictureBand scene="desk" />
        <Career />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
