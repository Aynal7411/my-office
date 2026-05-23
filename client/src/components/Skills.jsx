import SectionHeading from './SectionHeading';

const skills = [
  'React',
  'Vite',
  'Tailwind CSS',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Mongoose',
  'REST APIs',
  'Git',
];

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Technology stack"
          description="These are the tools I use to ship modern web applications for clients and projects."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-slate-200/80 bg-white/80 px-6 py-5 shadow-soft transition hover:-translate-y-1 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900/90"
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
