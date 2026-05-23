const sendEmail = require('../utils/sendEmail');
const Message = require('../models/Message');

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    await sendEmail({ name, email, message });

    res.status(200).json({
      success: true,
      message: 'Message saved and sent successfully',
    });
  } catch (error) {
    console.error('Contact controller error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Unable to process contact request',
    });
  }
};

module.exports = { contact };