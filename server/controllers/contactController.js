const sendEmail = require('../utils/sendEmail');
const Message = require('../models/Message');
const asyncHandler = require('../middleware/asyncHandler');
const { validateContactPayload } = require('../utils/validators');

const contact = asyncHandler(async (req, res) => {
  const { name, email, message } = validateContactPayload(req.body);

  const newMessage = await Message.create({ name, email, message });
  await sendEmail({ name, email, message, messageId: newMessage._id });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
  });
});

module.exports = { contact };
