const express = require('express');
const protectAdmin = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

router.use(protectAdmin);

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load admin projects', error: error.message });
  }
});

router.post('/projects', async (req, res) => {
  const { title, description, imageUrl, techStack, liveDemoUrl, githubUrl } = req.body;

  if (!title || !description || !imageUrl) {
    return res.status(400).json({ message: 'Title, description, and image URL are required' });
  }

  try {
    const project = new Project({ title, description, imageUrl, techStack, liveDemoUrl, githubUrl });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
});

module.exports = router;
