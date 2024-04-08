const express = require('express');
const axios = require('axios');

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const sendWhatsapp = require('./send_whatsapp');
const makeCall = require('./make_call');

const app = express();

app.get('/api', async (req, res) => {
    const result = await getResults();
    const previousData = fs.readFileSync('localData.json', 'utf8');
    const previousDataJson = JSON.parse(previousData);
    const resdata = await compareData(result, previousDataJson);
    if (resdata.length === 0) {
        res.json({ "message": "No new results" });
        sendMessageToTelegram(result[0].name);
    }
    else {
        const lengthresdata = resdata.length;
        for (let i = 0; i < lengthresdata; i++) {
            sendMessageToTelegram(resdata[i].name);
        }
        res.json(resdata);
    }
}
);

async function getResults() {
    const response = await axios.get('https://kturesult.pranavkd.workers.dev/');
    const data = response.data;
    const length = data.length;
    return data;
}

const sendMessageToTelegram = async (result) => {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const message = `New result: ${result}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
    await axios.get(url);
}

async function compareData(result, previousDataJson) {
    const length = result.length;
    const previousLength = previousDataJson.length;
    var newResults = [];
    for (let i = 0; i < length; i++) {
        var found = false;
        for (let j = 0; j < previousLength; j++) {
            if (result[i].name === previousDataJson[j].name) {
                found = true;
                break;
            }
        }
        if (!found) {
            newResults.push(result[i]);
        }
    }
    fs.writeFileSync('localData.json', JSON.stringify(result));
    return newResults;
}

const corn = require('node-cron');
const corn2 = require('node-cron');
const { json } = require('express/lib/response');



const scrapRes = async (data) => {
    for (let i = 0; i < data.length; i++) {
        //console.log(data.resultDetails[i].courseName + " " + data.resultDetails[i].grade);
        sendMessageToTelegram(data[i].courseName + " " + data[i].grade);
    }
};

const sendResults = async (examDefId,schemeId) => {
    // const responce = await fetch("https://api.ktu.edu.in/ktu-web-service/anon/individualresult", {
    //     "headers": {
    //       "accept": "application/json, text/plain, */*",
    //       "content-type": "application/json",
    //       "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    //       "sec-ch-ua-mobile": "?0",
    //       "sec-ch-ua-platform": "\"Linux\""
    //     },
    //     "referrer": "https://ktu.edu.in/",
    //     "referrerPolicy": "strict-origin-when-cross-origin",
    //     "body": `{\"registerNo\":\"UCE22CYS027\",\"dateOfBirth\":\"2005-02-16\",\"examDefId\":${examDefId},\"schemeId\":${schemeId}}`,
    //     "method": "POST",
    //     "mode": "cors",
    //     "credentials": "omit"
    //   });
    const response = await axios.get('https://kturesult.pranavkd.workers.dev/getResult?examDefId='+examDefId+'&schemeId='+schemeId);
    const data = response.data;
    sendMessageToTelegram(JSON.stringify(data));
    scrapRes(data.resultDetails);
}


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    corn.schedule('*/1 * * * *', async () => {
        const result = await getResults();
        const previousData = fs.readFileSync('localData.json', 'utf8');
        const previousDataJson = JSON.parse(previousData);
        const resdata = await compareData(result, previousDataJson);
        if (resdata.length === 0) {
            //sendMessageToTelegram(result[0].name);
        }
        else {
            const lengthresdata = resdata.length;
            //makeCall();
            for (let i = 0; i < lengthresdata; i++) {
                sendMessageToTelegram(resdata[i].name);
                if(resdata[i].name.includes("S1"))
                {
                    makeCall();
                    sendResults(resdata[i].examDefId,resdata[i].schemeId);
                }
                sendWhatsapp(resdata[i].name);
            }
        }
    });
    corn2.schedule('0 0 * * *', async () => {
        const result = await getResults();
        const previousData = fs.readFileSync('localData.json', 'utf8');
        const previousDataJson = JSON.parse(previousData);
        const resdata = await compareData(result, previousDataJson);
        if (resdata.length === 0) {
            sendMessageToTelegram("No new results");
        }
    });
    
});
