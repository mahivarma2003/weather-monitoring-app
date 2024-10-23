const nodemailer = require('nodemailer');

let consecutiveThresholdBreaches = 0; // To track consecutive breaches

const sendAlert = (message) => {
  console.log('ALERT:', message);

  // Example: sending an alert email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@gmail.com',
    subject: 'Weather Alert!',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Alert email sent: ' + info.response);
    }
  });
};

const checkThresholds = (currentTemp) => {
  const thresholdTemp = process.env.ALERT_THRESHOLD_TEMP;
  if (currentTemp > thresholdTemp) {
    consecutiveThresholdBreaches++;
    if (consecutiveThresholdBreaches >= 2) {
      sendAlert(`Temperature exceeds ${thresholdTemp}°C for two consecutive updates. Current temp: ${currentTemp}°C.`);
      consecutiveThresholdBreaches = 0;  // Reset after sending alert
    }
  } else {
    consecutiveThresholdBreaches = 0;  // Reset if no threshold breach
  }
};

module.exports = { checkThresholds };
