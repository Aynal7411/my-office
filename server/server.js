const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const projectsRoute = require('./routes/projects');
const adminRoute = require('./routes/admin');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/projects', projectsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Portfolio API is running' });
});

const startServer = (port) => {
  const server = app.listen(port, () => console.log(`✓ Server listening on port ${port}`));

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`✗ Port ${port} is already in use. Stop the process using it or set a different PORT in server/.env.`);
    } else {
      console.error('✗ Server error:', error.message);
    }
    process.exit(1);
  });
};

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    startServer(PORT);
  })
  .catch((error) => {
    console.error('✗ MongoDB connection failed:', error.message);
    console.error('  Check your MONGO_URI in .env and verify MongoDB Atlas network access');
    process.exit(1);
  });
