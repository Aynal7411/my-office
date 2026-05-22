import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.12 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <motion.main initial="initial" animate="animate" exit="exit" variants={pageVariants}>
      <Helmet>
        <title>Developer Portfolio — Home</title>
        <meta name="description" content="Full-stack developer portfolio showcasing projects, skills, and contact information." />
        <meta property="og:title" content="Developer Portfolio" />
        <meta property="og:description" content="Full-stack developer portfolio showcasing projects, skills, and contact information." />
      </Helmet>
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
