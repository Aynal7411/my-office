const sendEmail = require('../utils/sendEmail');

const contact = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          'All fields are required',
      });
    }

    await sendEmail({
      name,
      email,
      message,
    });

    res.status(200).json({
      success: true,
      message:
        'Message sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { contact };