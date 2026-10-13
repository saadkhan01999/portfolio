import { LazyMotion, MotionConfig } from 'framer-motion';
import { Provider } from 'react-redux';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import Journey from './components/sections/Journey';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Skills from './components/sections/Skills';
import { useThemeSync } from './hooks/useThemeSync';
import { store } from './store/store';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

function AppContent() {
  useThemeSync();

  return (
    <>
      <a href="#main" className="skip-link btn-primary">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Journey />
        <Contact />
      </main>
      <Footer />
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
