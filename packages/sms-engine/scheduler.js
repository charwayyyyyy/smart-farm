require('dotenv').config();
const cron = require('node-cron');
const { sendCalendarReminders } = require('./calendarService');

// Schedule the SMS reminders to run daily at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running scheduled SMS reminders...');
  await sendCalendarReminders();
});

// Also provide a function to run the service manually
const runManualReminders = async () => {
  console.log('Running manual SMS reminders...');
  await sendCalendarReminders();
};

// If this file is run directly, execute the reminders
if (require.main === module) {
  runManualReminders();
}

module.exports = { runManualReminders };