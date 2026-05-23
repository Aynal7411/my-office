function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
