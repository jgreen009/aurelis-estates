import { useCallback, useMemo, useState } from 'react';
import SeoMetadata from './components/common/SeoMetadata.jsx';
import Cursor from './components/common/Cursor.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Hero from './components/hero/Hero.jsx';
import AboutSection from './components/about/AboutSection.jsx';
import ShowcaseSection from './components/showcase/ShowcaseSection.jsx';
import PropertiesSection from './components/properties/PropertiesSection.jsx';
import CinematicRevealSection from './components/cinematic/CinematicRevealSection.jsx';
import ServicesSection from './components/services/ServicesSection.jsx';
import NeighborhoodsSection from './components/neighborhoods/NeighborhoodsSection.jsx';
import MapSection from './components/map/MapSection.jsx';
import CalculatorSection from './components/calculator/CalculatorSection.jsx';
import ExpertiseSection from './components/expertise/ExpertiseSection.jsx';
import TestimonialsSection from './components/testimonials/TestimonialsSection.jsx';
import ContactSection from './components/contact/ContactSection.jsx';
import FinalCallToAction from './components/contact/FinalCallToAction.jsx';
import Footer from './components/footer/Footer.jsx';
import ScrollProgress from './components/common/ScrollProgress.jsx';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import useReveals from './hooks/useReveals.js';
import { scrollToSection } from './utils/scroll.js';
import { properties } from './data/properties.js';
import { filterProperties, emptyFilters } from './utils/filters.js';

export default function App() {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [scheduleSource, setScheduleSource] = useState(null);
  const [filters, setFilters] = useState(emptyFilters);

  useSmoothScroll();
  useReveals();

  const visibleProperties = useMemo(() => filterProperties(properties, filters), [filters]);

  const onSelectProperty = useCallback((id) => setSelectedPropertyId(id), []);

  const scheduleViewing = useCallback((property) => {
    setScheduleSource(property);
    setSelectedPropertyId(property?.id ?? null);
    scrollToSection('#contact');
  }, []);

  return (
    <>
      <a
        href="#main"
        className="skip-link bg-charcoal text-ivory px-4 py-2 text-xs uppercase tracking-label rounded-sm shadow-card"
      >
        Skip to content
      </a>
      <SeoMetadata />
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <Hero />
        <AboutSection />
        <ShowcaseSection />
        <PropertiesSection
          filters={filters}
          onFiltersChange={setFilters}
          selectedPropertyId={selectedPropertyId}
          onSelectProperty={onSelectProperty}
          scheduleViewing={scheduleViewing}
          visibleProperties={visibleProperties}
        />
        <CinematicRevealSection />
        <ServicesSection />
        <NeighborhoodsSection />
        <MapSection
          visibleProperties={visibleProperties}
          selectedPropertyId={selectedPropertyId}
          onSelectProperty={onSelectProperty}
        />
        <CalculatorSection />
        <ExpertiseSection />
        <TestimonialsSection />
        <ContactSection scheduleSource={scheduleSource} />
        <FinalCallToAction />
      </main>
      <Footer />
    </>
  );
}
