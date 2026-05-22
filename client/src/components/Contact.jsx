import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/messages`, formData);
      setStatus('Message sent successfully! I will respond soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Unable to send message right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Get in touch</h2>
            <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300 leading-7">
              Have a project, collaboration, or just a question? Send a message and I will follow up via email.
            </p>
            <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <p className="text-slate-700 dark:text-slate-200">Prefer email?</p>
              <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">hello@example.com</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Tell me about your project"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
            {status && <p className="text-center text-sm text-slate-700 dark:text-slate-300">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
