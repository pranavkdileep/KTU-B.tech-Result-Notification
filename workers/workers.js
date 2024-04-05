addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if(url.pathname === '/getResult') {
    event.respondWith(handleGetResult(event.request));
  } else {
    event.respondWith(handleRequest(event.request));
  }
});


  
  async function handleRequest(request) {
    const resultjson = await getResults();
    const result = JSON.stringify(resultjson); 
    return new Response(result, {
      headers: { 'content-type': 'application/json',
    },
    status: 200,
    })
  }
  async function handleGetResult(request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const examDefId = params.get('examDefId');
    const schemeId = params.get('schemeId');
  
    const resultjson = await getResults(examDefId, schemeId);
    const result = JSON.stringify(resultjson); 
    return new Response(result, {
      headers: { 'content-type': 'application/json' },
      status: 200,
    })
  }



  // handle the request https://kturesult.pranavkd.workers.dev/getResult?examDefId='+examDefId+'&schemeId='+schemeId
  async function getResults(examDefId,schemeId) {
    const responce = await fetch("https://api.ktu.edu.in/ktu-web-service/anon/individualresult", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "content-type": "application/json",
          "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Linux\""
        },
        "body": `{\"registerNo\":\"UCE22CYS027\",\"dateOfBirth\":\"2005-02-16\",\"examDefId\":${examDefId},\"schemeId\":${schemeId}}`,
        "method": "POST",
      });
    const data = await responce.json();     
    return data;
  }
   
  
  async function getResults() {
    const response = await fetch("https://api.ktu.edu.in/ktu-web-service/anon/result", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "body": "{\"program\":\"1\"}",
        "method": "POST"
    });
  
    const data = await response.json();
    const length = data.length;
    var resultJson = [];
    for (let i = 0; i < length; i++) {
      resultJson.push({ "name": data[i].resultName, "examDefId":data[i].examDefId,"schemeId": data[i].schemeId });
    }
    console.log(resultJson);
    return resultJson;
  }
  