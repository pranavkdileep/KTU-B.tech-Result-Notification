const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twiliowhatsappNumber = process.env.TWILIO_NUMBER_WP;
const myNumber = process.env.MY_NUMBER;

const sendWhatsapp = (message) => { 
    client.messages
        .create({
            from: `whatsapp:${twiliowhatsappNumber}`,
            body: message,
            to: `whatsapp:${myNumber}`
        })
        .then(message => console.log(message.sid))
    }       

module.exports = sendWhatsapp;
