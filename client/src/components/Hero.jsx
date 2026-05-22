import { motion } from 'framer-motion';
import useTyping from '../hooks/useTyping';

function Hero() {
  const texts = ["Hi, I'm Aynal haque",  'MERN Stack Developer', 'I build scalable full-stack applications.'];
  const typed = useTyping(texts, 80, 1400);

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />

      <div className="absolute inset-0 -z-20 opacity-40 pointer-events-none">
        <div className="particles">
          <span className="particle" style={{ left: '5%', top: '20%', width: 8, height: 8 }} />
          <span className="particle" style={{ left: '20%', top: '10%', width: 10, height: 10 }} />
          <span className="particle" style={{ left: '40%', top: '30%', width: 6, height: 6 }} />
          <span className="particle" style={{ left: '70%', top: '15%', width: 12, height: 12 }} />
          <span className="particle" style={{ left: '85%', top: '40%', width: 9, height: 9 }} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 items-center lg:grid-cols-[1fr_0.45fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700 dark:bg-sky-900/20 dark:text-sky-200">
              Full-stack developer portfolio
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              <span className="block">{typed}</span>
              <span className="block mt-3 text-xl font-medium text-slate-600 dark:text-slate-300">MERN Stack Developer</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              I build scalable web apps, dynamic frontends, and backend APIs that help businesses and creative teams deliver polished digital products.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Contact me
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <motion.div
              initial={{ y: -4 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f9f0aca0a5a3b5b6f8c2f1b1f6c"
                alt="Aynal Haque"
                className="h-56 w-56 rounded-full object-cover shadow-lg"
              />
              <div className="absolute -right-6 -bottom-6 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-900 shadow-md">MERN</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
