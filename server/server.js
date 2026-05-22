const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const projectsRoute = require('./routes/projects');
const messagesRoute = require('./routes/messages');
const adminRoute = require('./routes/admin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {
  res.send({ message: 'Portfolio API is running' });
});

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
    app.listen(PORT, () => console.log(`✓ Server listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error('✗ MongoDB connection failed:', error.message);
    console.error('  Check your MONGO_URI in .env and verify MongoDB Atlas network access');
    process.exit(1);
  });
