import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import WorkProcess from "@/components/WorkProcess";
import CostEstimator from "@/components/CostEstimator";
import About from "@/components/About";
import Commitments from "@/components/Commitments";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BoardOfDirectors from "@/components/BoardOfDirectors";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <FeaturedProjects />
      <WorkProcess />
      <CostEstimator />
      <About />
      <Commitments />
      <News />
      <Contact />
      <Footer />
      <BoardOfDirectors />
    </main>
  );
}