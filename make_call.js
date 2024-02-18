const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const makeCall = () => {
    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_NUMBER_CALL
        })
        .then(call => console.log(call.sid));
}
module.exports = makeCall;