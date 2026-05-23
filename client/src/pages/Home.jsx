import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo || location.hash?.replace('#', '');
    if (target) {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 550,
        offset: -90,
      });
    }
  }, [location.state, location.hash]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.12 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <motion.main initial="initial" animate="animate" exit="exit" variants={pageVariants}>
      <Seo />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </motion.main>
  );
}

export default Home;
