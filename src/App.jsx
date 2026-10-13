import { lazy, Suspense, useState } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { Provider } from 'react-redux';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { BackToTop, ScrollProgress } from './components/layout/ScrollUi';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import Journey from './components/sections/Journey';
import Services from './components/sections/Services';
import Skills from './components/sections/Skills';
import Work from './components/sections/Work';
import { useAppSelector } from './hooks/useAppDispatch';
import { useCaseStudyUrl } from './hooks/useCaseStudyUrl';
import { usePaletteShortcut } from './hooks/usePaletteShortcut';
import { useRenderAllOnNavigate } from './hooks/useRenderAllOnNavigate';
import { useSpotlightTracking } from './hooks/useSpotlightTracking';
import { useThemeSync } from './hooks/useThemeSync';
import { store } from './store/store';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

// Dialog UIs load the first time they are needed, keeping the first paint light.
const CommandPalette = lazy(() => import('./components/layout/CommandPalette'));
const CaseStudy = lazy(() => import('./components/projects/CaseStudy'));

/** Mounts a lazily loaded overlay once it has been requested, then keeps it. */
function useLatch(value) {
  const [latched, setLatched] = useState(false);
  if (value && !latched) setLatched(true);
  return latched || Boolean(value);
}

function AppContent() {
  useThemeSync();
  useSpotlightTracking();
  usePaletteShortcut();
  useCaseStudyUrl();
  useRenderAllOnNavigate();
  const paletteNeeded = useLatch(useAppSelector((st) => st.ui.paletteOpen));
  const caseStudyNeeded = useLatch(useAppSelector((st) => st.ui.caseStudyId));

  return (
    <>
      <span id="top-anchor" tabIndex={-1} className="sr-only">
        Top of page
      </span>
      <a href="#main" className="skip-link btn-primary">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Work />
        <Services />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Suspense fallback={null}>
        {paletteNeeded && <CommandPalette />}
        {caseStudyNeeded && <CaseStudy />}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      {/* Animation features load after first render; reducedMotion="user" honours the OS setting. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <AppContent />
        </MotionConfig>
      </LazyMotion>
    </Provider>
  );
}
