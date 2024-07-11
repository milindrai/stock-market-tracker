const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Function to send verification email
const sendVerificationEmail = (user, token) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on this link: http://localhost:5000/api/users/verify/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Verification email sent: ' + info.response);
  });
};

module.exports = sendVerificationEmail;
