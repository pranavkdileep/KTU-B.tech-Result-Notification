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

const demores = {
    "resultDetails": [
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": "ALBERT",
            "dob": null,
            "userId": null,
            "resultName": " B.Tech S1 (R,S) Exam Dec 2023 (2019 scheme) (S1 Result)",
            "institutionName": "UNIVERSITY COLLEGE OF ENGINEERING",
            "registerNo": "UCE22CYS007",
            "dateOfBirth": "2003-09-05",
            "examDefId": 1014,
            "examMonth": 11,
            "examYear": 8,
            "semesterName": "S1",
            "middleName": "C",
            "credits": 3.00,
            "surName": "DOMINIC",
            "publishDate": null,
            "clusterId": null,
            "courseName": "ENGINEERING MECHANICS",
            "grade": "P",
            "branchName": "CYBER SECURITY",
            "description": "50% and above but less than 55%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": "P",
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        }
    ],
    "gradeDetails": [
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "S",
            "branchName": null,
            "description": "90% and above",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "A+",
            "branchName": null,
            "description": "85% and above but less than 90%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "A",
            "branchName": null,
            "description": "80% and above but less than 85%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "B+",
            "branchName": null,
            "description": "75% and above but less than 80%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "B",
            "branchName": null,
            "description": "70% and above but less than 75%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "C+",
            "branchName": null,
            "description": "65% and above but less than 70%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "C",
            "branchName": null,
            "description": "60% and above but less than 65%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "D",
            "branchName": null,
            "description": "55% and above but less than 60%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "P",
            "branchName": null,
            "description": "50% and above but less than 55%",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        },
        {
            "examId": null,
            "program": null,
            "name": null,
            "definitionName": null,
            "studentId": null,
            "firstName": null,
            "dob": null,
            "userId": null,
            "resultName": null,
            "institutionName": null,
            "registerNo": null,
            "dateOfBirth": null,
            "examDefId": null,
            "examMonth": null,
            "examYear": null,
            "semesterName": null,
            "middleName": null,
            "credits": null,
            "surName": null,
            "publishDate": null,
            "clusterId": null,
            "courseName": null,
            "grade": "F",
            "branchName": null,
            "description": "Below 50% (CIE + ESE) or Below 40 % for ESE",
            "fullName": null,
            "examYearName": null,
            "examYearAndMonth": null,
            "schemeId": null,
            "resultStatus": null,
            "gradeObtained": null,
            "resultDetails": null,
            "gradeDetails": null,
            "id": null
        }
    ],
    "created_date": null,
    "created_by": null,
    "modified_date": null,
    "modified_by": null,
    "id": null,
    "name": null,
    "examId": null,
    "definitionName": null,
    "resultName": " B.Tech S1 (R,S) Exam Dec 2023 (2019 scheme) (S1 Result)",
    "studentId": null,
    "firstName": "ALBERT",
    "middleName": "C",
    "surName": "DOMINIC",
    "dob": null,
    "userId": null,
    "publishDate": null,
    "examDefId": null,
    "clusterId": null,
    "registerNo": "UCE22CYS007",
    "semesterName": "S1",
    "examMonthName": "NOVEMBER",
    "examMonth": 11,
    "examYear": 8,
    "examYearName": "2022",
    "examYearAndMonth": "NOVEMBER  2022",
    "courseName": null,
    "grade": null,
    "credits": null,
    "branchName": "CYBER SECURITY",
    "description": null,
    "institutionName": "UNIVERSITY COLLEGE OF ENGINEERING",
    "fullName": " ALBERT C DOMINIC",
    "schemeId": null,
    "resultStatus": null,
    "gradeObtained": null
};

const scrapRes = async (data) => {
    for (let i = 0; i < data.resultDetails.length; i++) {
        //console.log(data.resultDetails[i].courseName + " " + data.resultDetails[i].grade);
        sendMessageToTelegram(data.resultDetails[i].courseName + " " + data.resultDetails[i].grade);
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
    scrapRes(data);
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
