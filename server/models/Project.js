const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    imageUrl: { type: String, required: true, trim: true },
    techStack: { type: [String], default: [], validate: [(items) => items.length <= 12, 'Too many technologies'] },
    liveDemoUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
