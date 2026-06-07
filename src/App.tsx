import { useLenis } from './hooks/useLenis';
import WatercolorDoodleBackground from './components/WatercolorDoodleBackground';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import FeaturedWorksSection from './sections/FeaturedWorksSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import QuoteBreakSection from './sections/QuoteBreakSection';
import AboutSection from './sections/AboutSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

export default function App() {
  useLenis();

  return (
    <>
      {/* Persistent watercolor doodle background */}
      <WatercolorDoodleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Hero - separate from content wrapper, has its own background */}
      <HeroSection />

      {/* Content wrapper - everything below hero shares the watercolor background */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <PhilosophySection />
        <FeaturedWorksSection />
        <ServicesSection />
        <ProcessSection />
        <QuoteBreakSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
