
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
