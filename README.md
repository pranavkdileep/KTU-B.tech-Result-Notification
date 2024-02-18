# Code Documentation

## Description
This code is an Express.js server that fetches data from an external API, compares it with locally stored data, and sends notifications via Telegram and WhatsApp for any new results. It also makes a scheduled phone call using Twilio if there are new results.

## Dependencies
- Express.js: Web application framework
- Axios: HTTP client for making requests
- fs: File system module for reading and writing files
- dotenv: Loads environment variables from a .env file
- node-cron: Scheduling library for cron-like tasks
- Twilio: API for making phone calls and sending messages

## Endpoints
1. **GET /api**
   - Fetches data from an external API.
   - Compares the new data with locally stored data.
   - Sends Telegram notifications for new results.
   - Sends WhatsApp messages for new results.
   - Makes a scheduled phone call if there are new results.
   - Runs every minute using `node-cron`.
   
## Functions
1. **getResults**
   - Fetches data from an external API.

2. **sendMessageToTelegram(result)**
   - Sends a Telegram message with the given result.

3. **compareData(result, previousDataJson)**
   - Compares the new data with locally stored data.
   - Updates the local data file with the new data.
   - Returns an array of new results.

4. **makeCall**
   - Makes a phone call using Twilio.
   - Exports the function for use in other modules.

5. **sendWhatsapp(message)**
   - Sends a WhatsApp message using Twilio.
   - Exports the function for use in other modules.

## Scheduled Tasks
1. **Every minute**
   - Fetches new results and compares them with stored data.
   - Sends Telegram notifications for new results.
   - Sends WhatsApp messages for new results.
   - Makes a scheduled phone call if there are new results.

2. **Every day at midnight**
   - Fetches new results and compares them with stored data.
   - Sends a Telegram message if there are no new results.

## Environment Variables
- BOT_TOKEN: Telegram bot token for sending messages.
- CHAT_ID: Telegram chat ID for sending messages.
- TWILIO_ACCOUNT_SID: Twilio account SID for authentication.
- TWILIO_AUTH_TOKEN: Twilio authentication token.
- TWILIO_NUMBER_CALL: Twilio phone number for making calls.
- TWILIO_NUMBER_WP: Twilio WhatsApp-enabled phone number.
- MY_NUMBER: User's phone number for notifications.

Make sure to set up a .env file with these variables before running the application.

Note: Ensure that you have configured your Twilio account and obtained the necessary credentials before using the phone call and WhatsApp functionalities.