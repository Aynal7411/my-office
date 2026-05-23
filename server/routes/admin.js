const express = require('express');
const protectAdmin = require('../middleware/auth');
const upload = require('../middleware/upload');
const Project = require('../models/Project');
const Message = require('../models/Message');
const asyncHandler = require('../middleware/asyncHandler');
const { adminLimiter } = require('../middleware/security');
const AppError = require('../utils/AppError');
const { validateProjectPayload } = require('../utils/validators');

const router = express.Router();

router.use(adminLimiter);
router.use(protectAdmin);

router.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: projects });
}));

router.post('/projects', upload.single('image'), asyncHandler(async (req, res) => {
  const payload = validateProjectPayload(req.body, req.file);
  const project = await Project.create(payload);
  res.status(201).json({ success: true, data: project });
}));

router.put('/projects/:id', upload.single('image'), asyncHandler(async (req, res) => {
  const payload = validateProjectPayload(req.body, req.file, true);
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    throw new AppError('Project not found', 404);
  }

  res.json({ success: true, data: updatedProject });
}));

router.delete('/projects/:id', asyncHandler(async (req, res) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.id);

  if (!deletedProject) {
    throw new AppError('Project not found', 404);
  }

  res.json({ success: true, message: 'Project deleted successfully' });
}));

router.get('/messages', asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json({ success: true, data: messages });
}));

router.patch('/messages/:id/status', asyncHandler(async (req, res) => {
  const allowedStatuses = ['new', 'read', 'archived'];

  if (!allowedStatuses.includes(req.body.status)) {
    throw new AppError('Invalid message status', 400);
  }

  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!message) {
    throw new AppError('Message not found', 404);
  }

  res.json({ success: true, data: message });
}));

module.exports = router;
