import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
        setProjects(response.data);
      } catch (err) {
        setError('Unable to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Recent work</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            The projects below are fetched from the backend API and demonstrate a dynamic portfolio experience.
          </p>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
            Loading projects...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-soft dark:border-red-700/40 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </div>
        ) : (
          <motion.div className="grid gap-6 xl:grid-cols-2" variants={container} initial="hidden" animate="show">
            {projects.map((project) => (
              <motion.div key={project._id} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
