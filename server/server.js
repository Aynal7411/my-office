const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const projectsRoute = require('./routes/projects');
const adminRoute = require('./routes/admin');
const contactRoutes = require('./routes/contactRoutes');
const validateEnv = require('./config/env');
const { applySecurityMiddleware, apiLimiter } = require('./middleware/security');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

applySecurityMiddleware(app);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d',
  immutable: true,
}));

app.use('/api', apiLimiter);
app.use('/api/projects', projectsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    uptime: process.uptime(),
  });
});

app.use(notFound);
app.use(errorHandler);

const startServer = (port) => {
  const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the process using it or set a different PORT in server/.env.`);
    } else {
      console.error('Server error:', error.message);
    }
    process.exit(1);
  });
};

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    startServer(PORT);
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    console.error('Check your MONGO_URI in .env and verify MongoDB Atlas network access');
    process.exit(1);
  });
