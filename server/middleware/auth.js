const dotenv = require('dotenv');

dotenv.config();

const protectAdmin = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const providedPassword = req.headers['x-admin-password'];

  if (!providedPassword || providedPassword !== adminPassword) {
    return res.status(401).json({ message: 'Unauthorized: Invalid admin password' });
  }

  next();
};

module.exports = protectAdmin;
