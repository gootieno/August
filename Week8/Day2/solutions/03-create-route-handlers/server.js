const http = require("http");

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    //affiliate=nasa&query=mars+rover%21&commit=Search
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody
        .split("&") //[affiliate=nasa,query=mars+rover%21,commit=Search]
        .map((keyValuePair) => keyValuePair.split("=")) //[[affiliate,nasa],[query,mars+rover%21],[commit,Search]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) //[[affiliate,nasa],[query,mars rover%21],[commit,Search]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) //[[affiliate,nasa],[query,mars rover!],[commit,Search]]
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body); // {key1:val1, key2:val2,...}
    }
    // Do not edit above this line

    // define route handlers here
    if (req.method === "GET" && req.url === "/") {
      /*
        get responseBody
        set statusCode
        set header
      */
      const responseBody = "Dog Club";
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/dogs") {
      const responseBody = "Dog Index";
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    // GET /dogs/:dogId || /dogs/new
    if (req.method === "GET" && req.url.startsWith("/dogs")) {
      const urlParts = req.url.split("/");

      console.log("url parts ", urlParts);
      const dogId = urlParts[urlParts.length - 1];

      if(urlParts.length === 3){
        if (dogId !== "new") {
          const responseBody = `Dog details for dogId: ${dogId}`;
          return res.end(responseBody);
        } else {
          const responseBody = "Dog create form page";
          return res.end(responseBody);
        }
      }
    }

    // POST /dogs
    if(req.method === 'POST' && req.url === '/dogs'){
      const dogId = getNewDogId()

      res.statusCode = 302;
      res.setHeader('Location', `/dogs/${dogId}`)
      return res.end()
    }
    // const filteredURL = req.url.split('/')
    // const dogId = filteredURL[2]

    // if(req.method === 'GET'){
    //   res.statusCode = 200;
    //   res.setHeader('Content-Type', 'text/plain');

    //   if(req.url === '/'){
    //     return res.end('Dog Club')
    //   }else if (req.url.startsWith('/dogs')){
    //     if(req.url === '/dogs'){
    //       return res.end('Dogs index');
    //     } else if (filteredURL.length  === 3 && Number(filteredURL[2])){ // "/dogs/new" => ["", "dogs", "3"]
    //       return res.end(`Dog details for ${dogId}`)
    //     } else if (req.url === '/dogs/new'){
    //       return res.end('Dogs create form page')
    //     } else if (filteredURL.length === 4 && !Number(filteredURL[3])){ // "/dogs/:dogId/edit" => ["", "dogs", "5",  "edit"]
    //       return res.end(`Dog edit form page for: ${dogId}`);
    //     }
    //   }
    // } else if (req.method === 'POST'){
    //   res.statusCode = 302;
    //   if(req.url === '/dogs'){
    //     res.setHeader(`Location`,  `/dogs/${getNewDogId()}`);
    //     return res.end();
    //   } else if (filteredURL.length === 3 && Number(filteredURL[2])){
    //     res.setHeader('Content-Type', 'text/plain');
    //     return res.end(`Location: ${req.url}`)
    //   }
    // }

    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("No matching route handler found for this endpoint");
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
