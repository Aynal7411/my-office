const AppError = require('../utils/AppError');

const protectAdmin = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = req.headers['x-admin-password'];

  if (!providedPassword || providedPassword !== adminPassword) {
    return next(new AppError('Unauthorized', 401));
  }

  next();
};

module.exports = protectAdmin;
