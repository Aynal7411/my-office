import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';
import SectionHeading from './SectionHeading';
import { api, getApiError } from '../api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/projects', { signal: controller.signal });
        setProjects(response.data?.data || []);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(getApiError(err, 'Unable to load projects. Please try again later.'));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
  };

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Recent work"
          description="Selected full-stack projects with production-minded APIs, responsive interfaces, and maintainable implementation details."
        />
        {loading ? (
          <ProjectSkeleton />
        ) : error ? (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-soft dark:border-red-700/40 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
            Projects will appear here soon.
          </div>
        ) : (
          <motion.div className="grid gap-6 xl:grid-cols-2" variants={container} initial="hidden" animate="show">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
