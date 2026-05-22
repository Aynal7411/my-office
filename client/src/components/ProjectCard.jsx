import { motion } from 'framer-motion';

function ProjectCard({ project, variants }) {
  return (
    <motion.article
      variants={variants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft transition dark:border-slate-800 dark:bg-slate-900/90"
    >
      <img src={project.imageUrl} alt={project.title} className="mb-4 h-56 w-full rounded-3xl object-cover" />
      <div>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Live demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
