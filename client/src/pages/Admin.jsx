import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE } from '../api';

const ADMIN_PASSWORD = 'admin123';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null,
    techStack: '',
    liveDemoUrl: '',
    githubUrl: '',
  });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (authenticated) {
      loadProjects();
    }
  }, [authenticated]);

  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/admin/projects`, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      });
      setProjects(response.data);
    } catch (err) {
      setError('Unable to load admin projects. Please check your backend and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (event) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setFeedback('Admin access granted. You can manage projects now.');
    } else {
      setFeedback('Invalid admin password. This page is for demo purposes only.');
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setFormState({ ...formState, imageFile: files?.[0] || null });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const resetForm = () => {
    setFormState({ title: '', description: '', imageUrl: '', imageFile: null, techStack: '', liveDemoUrl: '', githubUrl: '' });
    setEditingProjectId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      const formData = new FormData();
      formData.append('title', formState.title);
      formData.append('description', formState.description);
      if (formState.imageFile) {
        formData.append('image', formState.imageFile);
      } else if (formState.imageUrl) {
        formData.append('imageUrl', formState.imageUrl);
      }
      formData.append('techStack', JSON.stringify(formState.techStack.split(',').map((item) => item.trim()).filter(Boolean)));
      formData.append('liveDemoUrl', formState.liveDemoUrl);
      formData.append('githubUrl', formState.githubUrl);

      if (editingProjectId) {
        await axios.put(`${API_BASE}/admin/projects/${editingProjectId}`, formData, {
          headers: { 'x-admin-password': ADMIN_PASSWORD, 'Content-Type': 'multipart/form-data' },
        });
        setFeedback('Project updated successfully.');
      } else {
        await axios.post(`${API_BASE}/admin/projects`, formData, {
          headers: { 'x-admin-password': ADMIN_PASSWORD, 'Content-Type': 'multipart/form-data' },
        });
        setFeedback('Project added successfully.');
      }

      resetForm();
      loadProjects();
    } catch (err) {
      setFeedback('Failed to save project. Please check your input and try again.');
    }
  };

  const handleEdit = (project) => {
    setEditingProjectId(project._id);
    setFormState({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      imageFile: null,
      techStack: project.techStack.join(', '),
      liveDemoUrl: project.liveDemoUrl || '',
      githubUrl: project.githubUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Delete this project permanently?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/admin/projects/${projectId}`, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      });
      setFeedback('Project removed successfully.');
      loadProjects();
    } catch (err) {
      setFeedback('Unable to delete project. Please try again later.');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  };

  return (
    <motion.main initial="initial" animate="animate" exit="exit" variants={pageVariants} className="min-h-screen bg-slate-50 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Helmet>
        <title>Admin — Developer Portfolio</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Admin dashboard for managing portfolio projects. Protected demo area." />
      </Helmet>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            This demo admin page is protected by a simple password header. Use it to add, edit, or delete portfolio projects.
          </p>
          {!authenticated ? (
            <form onSubmit={handleAuth} className="mt-6 flex max-w-sm flex-col gap-4">
              <input
                type="password"
                name="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Unlock admin
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950/90">
              <p className="text-sm text-slate-600 dark:text-slate-300">Admin access enabled. Use the form below to manage portfolio projects.</p>
            </div>
          )}
        </div>

        {feedback && (
          <div className="mb-6 rounded-3xl border border-slate-300 bg-slate-50 p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200">
            {feedback}
          </div>
        )}

        {authenticated && (
          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <h2 className="text-2xl font-semibold">Project editor</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
                  <input
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Project image</label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  {formState.imageFile && <p className="mt-2 text-sm text-sky-600 dark:text-sky-400">File selected: {formState.imageFile.name}</p>}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Or paste image URL below if uploading a file</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Image URL (fallback)</label>
                  <input
                    name="imageUrl"
                    value={formState.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Tech stack</label>
                  <input
                    name="techStack"
                    value={formState.techStack}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Comma-separated list"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Live demo URL</label>
                    <input
                      name="liveDemoUrl"
                      value={formState.liveDemoUrl}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">GitHub URL</label>
                    <input
                      name="githubUrl"
                      value={formState.githubUrl}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {editingProjectId ? 'Update project' : 'Add project'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Clear form
                  </button>
                </div>
              </form>
            </section>
            <section className="rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Projects</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Manage content</h2>
                </div>
                <button
                  type="button"
                  onClick={loadProjects}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-300">
                  Loading projects...
                </div>
              ) : error ? (
                <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700 dark:border-red-700/40 dark:bg-red-900/30 dark:text-red-200">
                  {error}
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {projects.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-300">
                      No projects available yet.
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div
                        key={project._id}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-950/90"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => handleEdit(project)}
                              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(project._id)}
                              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </motion.main>
  );
}

export default Admin;
