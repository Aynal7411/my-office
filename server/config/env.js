const requiredEnv = ['MONGO_URI', 'ADMIN_PASSWORD'];

const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.NODE_ENV === 'production' && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters long');
  }

  if (process.env.NODE_ENV !== 'production' && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length < 12) {
    console.warn('ADMIN_PASSWORD is short. Use at least 12 characters before deploying to production.');
  }
};

module.exports = validateEnv;
