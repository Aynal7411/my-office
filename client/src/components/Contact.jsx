import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { api, getApiError } from '../api';

const initialFormData = { name: '', email: '', message: '', website: '' };

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      await api.post('/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully. I will respond soon.' });
      setFormData(initialFormData);
    } catch (error) {
      setStatus({ type: 'error', message: getApiError(error, 'Unable to send message right now. Please try again later.') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Get in touch"
              description="Have a project, collaboration, or question? Send a message and I will follow up via email."
            />
            <div className="rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <p className="text-slate-700 dark:text-slate-200">Prefer email?</p>
              <a
                href="mailto:aynalhaque7411@gmail.com"
                className="mt-3 inline-block text-lg font-semibold text-slate-950 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
              >
                aynalhaque7411@gmail.com
              </a>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90"
          >
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Your name"
                autoComplete="name"
                maxLength="120"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                minLength="20"
                maxLength="3000"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Tell me about your project"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
            {status.message && (
              <p
                role="status"
                className={`text-center text-sm ${status.type === 'error' ? 'text-red-600 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
