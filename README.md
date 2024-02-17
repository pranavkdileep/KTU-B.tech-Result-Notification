# KTU-B.tech-Result-Notification

# Code Documentation

## Introduction
This code is an Express.js application that fetches data from an external API, compares it with locally stored data, and sends notifications to a Telegram channel for new results.

## Dependencies
- Express.js: Web application framework for Node.js
- Axios: HTTP client for making requests
- fs: File system module for handling file operations
- dotenv: Loads environment variables from a .env file
- node-cron: Scheduler for running tasks at specified intervals

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file with the following variables:
    - `BOT_TOKEN`: Telegram Bot token
    - `CHAT_ID`: Telegram channel ID

## Code Structure

### Express App Setup
- `const app = express();`: Initializes the Express application.

### API Endpoint `/api`
- Fetches results from an external API using `getResults` function.
- Compares new results with previously stored data using `compareData` function.
- Sends Telegram notifications for new results using `sendMessageToTelegram` function.

### Functions
1. `getResults()`: Fetches data from the external API.
2. `sendMessageToTelegram(result)`: Sends a Telegram message with the new result.
3. `compareData(result, previousDataJson)`: Compares new data with the locally stored data and returns new results.

### Cron Jobs
- Two cron jobs are scheduled using `node-cron`:
  1. Runs every 5 minutes (`'*/5 * * * *'`): Checks for new results and sends notifications.
  2. Runs daily at midnight (`'0 0 * * *'`): Checks for new results and sends a daily summary.

### Server Start
- `app.listen(3000, () => {...});`: Starts the server on port 3000.

## Usage
- Run the application: `node app.js`
- Access the API endpoint: `http://localhost:3000/api`

Note: Ensure that the Telegram Bot has the necessary permissions and the provided environment variables are correctly set.
