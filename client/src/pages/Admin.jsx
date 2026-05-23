import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { api, getApiError } from '../api';

const initialFormState = {
  title: '',
  description: '',
  imageUrl: '',
  imageFile: null,
  techStack: '',
  liveDemoUrl: '',
  githubUrl: '',
};

function Admin() {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPassword') || '');
  const [authenticated, setAuthenticated] = useState(Boolean(sessionStorage.getItem('adminPassword')));
  const [formState, setFormState] = useState(initialFormState);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [feedback, setFeedback] = useState('');

  const adminHeaders = useMemo(() => ({ 'x-admin-password': password }), [password]);

  const loadAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [projectsResponse, messagesResponse] = await Promise.all([
        api.get('/admin/projects', { headers: adminHeaders }),
        api.get('/admin/messages', { headers: adminHeaders }),
      ]);
      setProjects(projectsResponse.data?.data || []);
      setMessages(messagesResponse.data?.data || []);
      setAuthenticated(true);
      sessionStorage.setItem('adminPassword', password);
    } catch (err) {
      setError(getApiError(err, 'Unable to load admin data. Check the password and backend configuration.'));
      setAuthenticated(false);
      sessionStorage.removeItem('adminPassword');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated && password) {
      loadAdminData();
    }
  }, []);

  const handleAuth = async (event) => {
    event.preventDefault();
    setFeedback('');
    await loadAdminData();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword');
    setAuthenticated(false);
    setPassword('');
    setProjects([]);
    setMessages([]);
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormState((current) => ({
      ...current,
      [type === 'file' ? 'imageFile' : name]: type === 'file' ? files?.[0] || null : value,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setEditingProjectId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (key === 'imageFile') return;
        formData.append(key, value);
      });
      if (formState.imageFile) {
        formData.append('image', formState.imageFile);
      }
      formData.set('techStack', JSON.stringify(formState.techStack.split(',').map((item) => item.trim()).filter(Boolean)));

      if (editingProjectId) {
        await api.put(`/admin/projects/${editingProjectId}`, formData, { headers: adminHeaders });
        setFeedback('Project updated successfully.');
      } else {
        await api.post('/admin/projects', formData, { headers: adminHeaders });
        setFeedback('Project added successfully.');
      }

      resetForm();
      await loadAdminData();
    } catch (err) {
      setFeedback(getApiError(err, 'Failed to save project. Please check your input and try again.'));
    }
  };

  const handleEdit = (project) => {
    setEditingProjectId(project._id);
    setFormState({
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      imageFile: null,
      techStack: project.techStack?.join(', ') || '',
      liveDemoUrl: project.liveDemoUrl || '',
      githubUrl: project.githubUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Delete this project permanently?')) return;

    try {
      await api.delete(`/admin/projects/${projectId}`, { headers: adminHeaders });
      setFeedback('Project removed successfully.');
      await loadAdminData();
    } catch (err) {
      setFeedback(getApiError(err, 'Unable to delete project. Please try again later.'));
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      await api.patch(`/admin/messages/${messageId}/status`, { status }, { headers: adminHeaders });
      await loadAdminData();
    } catch (err) {
      setFeedback(getApiError(err, 'Unable to update message status.'));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  };

  return (
    <motion.main initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-slate-50 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Seo title="Admin | Aynal Haque Portfolio" description="Protected admin dashboard." noindex />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Manage portfolio projects and review saved contact messages.</p>
            </div>
            {authenticated && (
              <button type="button" onClick={handleLogout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                Log out
              </button>
            )}
          </div>
          {!authenticated ? (
            <form onSubmit={handleAuth} className="mt-6 flex max-w-sm flex-col gap-4">
              <label htmlFor="admin-password" className="text-sm font-medium text-slate-700 dark:text-slate-200">Admin password</label>
              <input
                id="admin-password"
                type="password"
                name="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-70 dark:bg-slate-100 dark:text-slate-950">
                {loading ? 'Checking...' : 'Unlock admin'}
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-lg border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950/90">
              <p className="text-sm text-slate-600 dark:text-slate-300">Admin access enabled for this browser session.</p>
            </div>
          )}
        </div>

        {(feedback || error) && (
          <div role="status" className="mb-6 rounded-lg border border-slate-300 bg-slate-50 p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200">
            {feedback || error}
          </div>
        )}

        {authenticated && (
          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <h2 className="text-2xl font-semibold">Project editor</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {['title', 'description', 'imageUrl', 'techStack', 'liveDemoUrl', 'githubUrl'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="mb-2 block text-sm font-medium capitalize text-slate-700 dark:text-slate-200">{field.replace(/([A-Z])/g, ' $1')}</label>
                    {field === 'description' ? (
                      <textarea id={field} name={field} value={formState[field]} onChange={handleChange} rows="4" className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950" required />
                    ) : (
                      <input id={field} name={field} value={formState[field]} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950" required={['title', 'imageUrl'].includes(field) && !formState.imageFile} placeholder={field === 'techStack' ? 'React, Node.js, MongoDB' : ''} />
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="imageFile" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Project image upload</label>
                  <input id="imageFile" type="file" name="imageFile" onChange={handleChange} accept="image/jpeg,image/png,image/webp" className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
                  {formState.imageFile && <p className="mt-2 text-sm text-sky-600 dark:text-sky-400">File selected: {formState.imageFile.name}</p>}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950">
                    {editingProjectId ? 'Update project' : 'Add project'}
                  </button>
                  <button type="button" onClick={resetForm} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    Clear form
                  </button>
                </div>
              </form>
            </section>
            <section className="space-y-8">
              <div className="rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Projects</h2>
                  <button type="button" onClick={loadAdminData} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Refresh</button>
                </div>
                <div className="mt-6 space-y-4">
                  {projects.map((project) => (
                    <article key={project._id} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/90">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button type="button" onClick={() => handleEdit(project)} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Edit</button>
                          <button type="button" onClick={() => handleDelete(project._id)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Delete</button>
                        </div>
                      </div>
                    </article>
                  ))}
                  {projects.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">No projects available yet.</p>}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
                <h2 className="text-2xl font-semibold">Contact messages</h2>
                <div className="mt-6 space-y-4">
                  {messages.map((message) => (
                    <article key={message._id} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/90">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{message.name}</h3>
                          <a className="text-sm text-sky-600 dark:text-sky-300" href={`mailto:${message.email}`}>{message.email}</a>
                          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{message.message}</p>
                        </div>
                        <select value={message.status} onChange={(event) => updateMessageStatus(message._id, event.target.value)} className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </article>
                  ))}
                  {messages.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">No contact messages yet.</p>}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </motion.main>
  );
}

export default Admin;
