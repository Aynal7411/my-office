const validator = require('validator');
const AppError = require('./AppError');

const cleanString = (value = '') => validator.escape(String(value).trim());

const normalizeUrl = (value = '') => String(value || '').trim();

const validateUrl = (value, field) => {
  if (!value) return '';

  if (!validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
    throw new AppError(`${field} must be a valid URL`, 400);
  }

  return value;
};

const parseTechStack = (value) => {
  if (Array.isArray(value)) {
    return value.map(cleanString).filter(Boolean).slice(0, 12);
  }

  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid tech stack');
    }

    return parsed.map(cleanString).filter(Boolean).slice(0, 12);
  } catch (error) {
    throw new AppError('Tech stack must be a JSON array', 400);
  }
};

const validateProjectPayload = (body, file, partial = false) => {
  const title = cleanString(body.title);
  const description = cleanString(body.description);
  const imageUrl = file ? `/uploads/${file.filename}` : validateUrl(normalizeUrl(body.imageUrl), 'Image URL');

  if (!partial && (!title || !description || !imageUrl)) {
    throw new AppError('Title, description, and image are required', 400);
  }

  const payload = {};

  if (title) payload.title = title;
  if (description) payload.description = description;
  if (imageUrl) payload.imageUrl = imageUrl;
  if (body.techStack !== undefined) payload.techStack = parseTechStack(body.techStack);
  if (body.liveDemoUrl !== undefined) payload.liveDemoUrl = validateUrl(normalizeUrl(body.liveDemoUrl), 'Live demo URL');
  if (body.githubUrl !== undefined) payload.githubUrl = validateUrl(normalizeUrl(body.githubUrl), 'GitHub URL');

  return payload;
};

const validateContactPayload = (body) => {
  const name = cleanString(body.name);
  const email = validator.normalizeEmail(String(body.email || '').trim());
  const message = cleanString(body.message);
  const website = String(body.website || '').trim();

  if (website) {
    throw new AppError('Message rejected', 400);
  }

  if (!name || !email || !message) {
    throw new AppError('Name, email, and message are required', 400);
  }

  if (!validator.isEmail(email)) {
    throw new AppError('Please provide a valid email address', 400);
  }

  if (message.length < 20) {
    throw new AppError('Message must be at least 20 characters', 400);
  }

  return { name, email, message };
};

module.exports = {
  validateContactPayload,
  validateProjectPayload,
};
