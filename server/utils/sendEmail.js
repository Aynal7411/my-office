const nodemailer = require('nodemailer');

const transporter =
  nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

const sendEmail = async ({
  name,
  email,
  message,
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL,

    to: process.env.EMAIL,

    subject: `New Contact From ${name}`,

    html: `
      <div style="
        font-family: Arial;
        padding: 20px;
      ">
        <h2>New Contact Message</h2>

        <p>
          <strong>Name:</strong>
          ${name}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <div style="
          background:#f4f4f4;
          padding:15px;
          border-radius:8px;
        ">
          ${message}
        </div>
      </div>
    `,
  });
};

module.exports = sendEmail;