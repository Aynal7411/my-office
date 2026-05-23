const express = require('express');
const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .select('title description imageUrl techStack liveDemoUrl githubUrl createdAt')
    .sort({ createdAt: -1 })
    .lean();

  res.json({ success: true, data: projects });
}));

module.exports = router;
