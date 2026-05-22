function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
            <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">About me</h2>
            <p className="mt-5 text-slate-600 dark:text-slate-300 leading-7">
              I am a dedicated developer focused on delivering clean interfaces, fast backend APIs, and responsive web experiences. My portfolio is built with a modern MERN stack that supports dynamic content stored in MongoDB.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
              I enjoy collaborating on projects that require polished UI, maintainable code, and thoughtful performance optimizations.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">What I build</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-7">
                Responsive landing pages, admin dashboards, full-stack applications, and content-driven websites with smooth animations and accessibility in mind.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Experience</p>
                <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">Modern JavaScript</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Approach</p>
                <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">Data-driven UI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
