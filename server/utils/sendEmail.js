const nodemailer = require('nodemailer');

const createTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const baseEmailStyles = `
  font-family: Arial, Helvetica, sans-serif;
  color: #0f172a;
  line-height: 1.6;
`;

const adminTemplate = ({ name, email, message, messageId }) => `
  <div style="${baseEmailStyles} max-width: 640px; margin: 0 auto; padding: 24px;">
    <p style="margin:0 0 8px; color:#2563eb; font-weight:700;">New portfolio enquiry</p>
    <h1 style="margin:0 0 20px; font-size:24px;">${escapeHtml(name)} sent a message</h1>
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Message ID:</strong> ${escapeHtml(messageId)}</p>
      <p style="margin-bottom:8px;"><strong>Message:</strong></p>
      <p style="white-space:pre-wrap; margin-top:0;">${escapeHtml(message)}</p>
    </div>
  </div>
`;

const autoReplyTemplate = ({ name }) => `
  <div style="${baseEmailStyles} max-width: 640px; margin: 0 auto; padding: 24px;">
    <h1 style="margin:0 0 16px; font-size:24px;">Thanks for reaching out, ${escapeHtml(name)}.</h1>
    <p>Your message has been received. I will review the details and reply as soon as possible.</p>
    <p style="margin-top:24px; color:#475569;">Aynal Haque<br />MERN Stack Developer</p>
  </div>
`;

const sendEmail = async ({ name, email, message, messageId }) => {
  const transporter = createTransporter();
  const from = `"Aynal Haque Portfolio" <${process.env.EMAIL}>`;

  await transporter.sendMail({
    from,
    to: process.env.EMAIL,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    html: adminTemplate({ name, email, message, messageId }),
  });

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Thanks for contacting Aynal Haque',
    html: autoReplyTemplate({ name }),
  });
};

module.exports = sendEmail;
