import { motion } from 'framer-motion';
import useTyping from '../hooks/useTyping';
import profileImg from '../assets/profile-3-optimized.jpg';

function Hero() {
  const texts = ["Hi, I'm Aynal Haque", 'MERN Stack Developer', 'I build scalable full-stack applications.'];
  const typed = useTyping(texts, 80, 1400);

  return (
    <section id="home" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_34%),linear-gradient(135deg,#f8fafc,#eef2ff_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),linear-gradient(135deg,#020617,#0f172a_52%,#020617)]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.44fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-1 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-900/70 dark:bg-slate-900/70 dark:text-sky-200">
              Full-stack developer portfolio
            </p>

            <h1 className="mt-4 min-h-[7.5rem] text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              <span className="block">{typed}</span>
              <span className="mt-4 block text-xl font-medium text-slate-600 dark:text-slate-300">React, Node.js, Express, MongoDB</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              I build scalable web apps, dynamic frontends, and backend APIs that help businesses and creative teams deliver polished digital products.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
                View projects
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                Contact me
              </a>
              <a href="/resume.pdf" className="inline-flex items-center justify-center rounded-full border border-transparent bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400" target="_blank" rel="noreferrer">
                Download CV
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ y: -4 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src={profileImg}
                alt="Aynal Haque"
                width="320"
                height="320"
                fetchPriority="high"
                className="h-64 w-64 rounded-full border-4 border-white object-cover shadow-soft dark:border-slate-800 sm:h-80 sm:w-80"
              />
              <div className="absolute -bottom-4 -right-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                MERN
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
