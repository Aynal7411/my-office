const express = require('express');
const { contact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/security');

const router = express.Router();

router.post('/', contactLimiter, contact);

module.exports = router;
