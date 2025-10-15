require('dotenv').config();
const cron = require('node-cron');
const { sendCalendarReminders } = require('./calendarService');
const { connectDB } = require('../backend/utils/db');

// Initialize database before running any tasks
let dbInitialized = false;

const initializeDatabase = async () => {
  if (!dbInitialized) {
    try {
      await connectDB();
      dbInitialized = true;
    } catch (error) {
      console.log('Database initialization skipped:', error.message);
    }
  }
};

// Schedule the SMS reminders to run daily at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running scheduled SMS reminders...');
  await initializeDatabase();
  await sendCalendarReminders();
});

// Also provide a function to run the service manually
const runManualReminders = async () => {
  console.log('Running manual SMS reminders...');
  await initializeDatabase();
  await sendCalendarReminders();
};

// If this file is run directly, execute the reminders
if (require.main === module) {
  runManualReminders().then(() => {
    console.log('Manual reminders completed');
    process.exit(0);
  }).catch(error => {
    console.error('Error running manual reminders:', error.message);
    process.exit(1);
  });
}

module.exports = { runManualReminders };