addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const resultjson = await getResults();
    const result = JSON.stringify(resultjson); 
    return new Response(result, {
      headers: { 'content-type': 'application/json',
    },
    status: 200,
    })
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
        resultJson.push({ "name": data[i].resultName });
    }
    console.log(resultJson);
    return resultJson;
  }
  