function ProjectSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-2" aria-label="Loading projects">
      {[0, 1].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-lg border border-slate-200/80 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/90"
        >
          <div className="h-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default ProjectSkeleton;
