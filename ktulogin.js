const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const { env } = require('process');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();

const makeCall = require('./make_call');

let lastupdatetime = new Date();


const pass = env.PASS;
let finalMmessage = 'The Current Result is : \n';

const messageId = '1847';
const BotToken = env.BOT_TOKEN;
const ChatId = env.CHAT_ID;

const imgbbkey = env.IMGBBKEY;

const capabilities = {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'puppeteer-build-1',
        'name': 'My first Puppeteer test',
        'resolution':'1024x768',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true
    }
};

async function updateMessage(message){
    const url = `https://api.telegram.org/bot${BotToken}/editMessageText?chat_id=${ChatId}&message_id=${messageId}&text=${message}`;
    try {
        const response = await axios.get(url);
        //console.log(response);
    } catch (error) {
        //console.error(error);
    }   
}


async function upload(name)
{
    const filePath = name + '.png';

    let formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            headers: formData.getHeaders(),
            params: {
                key: imgbbkey,
                expiration: 60*30
            },
            data: formData
        });

        console.log(response.data.data.url);
        return response.data.data.url;
    } catch (error) {
        console.error(error);
    }

}


async function UpdateResultLinks()
{
    try{
    // const browser = await pupeeteer.launch({
    //     executablePath: '/usr/bin/google-chrome',
    //     headless: 'new',
    //     ignoreDefaultArgs: ['--disable-extensions'],
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });
    const browser = await puppeteer.connect({
        browserWSEndpoint:
            `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
    });
    //const browser = await pupeeteer.launch();               
    const page = await browser.newPage();
    await page.goto('https://app.ktu.edu.in/login.htm');
    await page.setViewport({ width: 1024, height: 768 });  
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'UCE22CYS027');
    await page.type('input[name="password"]', pass);
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[type="submit"]');
    await new Promise((resolve, reject) => { setTimeout(resolve, 2000) });
    await page.goto('https://app.ktu.edu.in/eu/stu/studentDetailsView.htm'); 
    await page.waitForSelector('a[class="btn btn-sm btn-primary"]');
    const reasultLinks = await page.evaluate(() => {
        const Card = Array.from(document.querySelectorAll('div[class="well col-sm-12"]'));
        const data = Card.map(card => {
            const element = card.querySelector('a[class="btn btn-sm btn-primary"]');
            const result = element ? element.getAttribute('href') : null;
            const nameElement = card.querySelector('label[class="badge pull-left"]');
            const name = nameElement ? nameElement.innerHTML : null;
            return { name: name, link: result != null ? "https://app.ktu.edu.in"+result : null };
        });
        return data;
    });
    console.log(reasultLinks);
    for (const { name, link } of reasultLinks) {
        if(name != null && link != null)
        {
            if(name.includes('S3'))
            {
                try{makeCall();}catch(error){}
                
            }
            await page.goto(link);
            await page.waitForSelector('div[class="table-responsive"]');
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
              });
            await page.screenshot({ path: name + '.png'});
            let inmagelink = await upload(name);
            finalMmessage += name + ' : ' + inmagelink + '\n';
            lastupdatetime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        }
    }  
    finalMmessage += '\nLast Updated at : ' + lastupdatetime + '\n';
    await updateMessage(finalMmessage); 
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
    return finalMmessage;   
}
catch (error) {
    console.error(error);
    return 'Error Occured';
}
    
}


const getResponce = async () => {
    const message = await UpdateResultLinks();
    return message;
}

console.log('Result Updated');

app.get('/', (req, res) => {
    getResponce().then((message) => {
        res.send(message);
        finalMmessage = 'The Current Result is : \n';
    });

});

nodeCorn = require('node-cron');

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    nodeCorn.schedule('*/6 * * * *', () => {
        getResponce().then((message) => {
            console.log(message);
            finalMmessage = 'The Current Result is : \n';
        });
    });
});



