function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-400">
      <div className="mx-auto max-w-6xl px-6">
        <p>Built with React, Tailwind CSS, Node.js, Express, and MongoDB.</p>
        <p className="mt-2">© {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
