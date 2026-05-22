import { useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { ThemeContext } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
];

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navItemClass =
    'text-sm transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer';
  const activeNavClass = 'text-sky-600 font-semibold';

  const renderNavLink = (link) => {
    if (location.pathname === '/') {
      return (
        <ScrollLink
          key={link.to}
          to={link.to}
          smooth={true}
          spy={true}
          offset={-90}
          duration={500}
          activeClass={activeNavClass}
          className={navItemClass}
        >
          {link.label}
        </ScrollLink>
      );
    }

    return (
      <button
        key={link.to}
        type="button"
        onClick={() => navigate('/', { state: { scrollTo: link.to } })}
        className={navItemClass}
      >
        {link.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Aynal Haque
        </RouterLink>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(renderNavLink)}
          <RouterLink
            to="/admin"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Admin
          </RouterLink>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <RouterLink
            to="/admin"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 md:hidden"
          >
            Admin
          </RouterLink>
        </div>
      </div>
      {location.pathname === '/admin' ? null : (
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 pb-2 md:hidden">
          <span className="text-sm text-slate-500 dark:text-slate-400">Scroll for details</span>
        </div>
      )}
    </header>
  );
}

export default Navbar;
