const http = require("http");

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2,
  },
  {
    dogId: 22,
    name: "Hachi Roku",
    age: 3,
  },
];

let nextDogId = 3;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    // request is finished assembly the entire request body
    // Parsing the body of the request depending on the Content-Type header
    if (reqBody) {
      switch (req.headers["content-type"]) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ======================== ROUTE HANDLERS ======================== */

    // GET /dogs
    if (req.method === "GET" && req.url === "/dogs") {
      // Your code here
      /*
        response body
        content type
        headers
        end res
      */
      const resBody = JSON.stringify(dogs);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(resBody);
    }

    // GET /dogs/:dogId
    if (req.method === "GET" && req.url.startsWith("/dogs/")) {
      const urlParts = req.url.split("/"); // ['', 'dogs', '1']
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        const dog = dogs.find((dog) => {
          console.log("dog ", dog);
          console.log("dogId ", dogId);
          return dog.dogId == dogId;
        });
        if (dog) {
          const resBody = JSON.stringify(dog);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(resBody);
        }
      }
    }

    // POST /dogs
    if (req.method === "POST" && req.url === "/dogs") {
      const { name, age } = req.body;
      // Your code here
      const dogId = getNewDogId();
      const dog = {
        dogId: dogId,
        name: name,
        age: age,
      };
      dogs.push(dog);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      let resBody = JSON.stringify(dog);
      return res.end(resBody);
    }

    // PUT or PATCH /dogs/:dogId
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.url.startsWith("/dogs/")
    ) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        /*
        find dog with dogId
        verify dog exists
        update the dog  
        get name && age from body
        update dog name && age
        set statusCode
        set header
        return response
        */
        const dog = dogs.find((dog) => dog.dogId === +dogId);
        if (dog) {
          const { name, age } = req.body;
          // if (name) dog.name = name;
          // if (age) dog.age = age;

          dog.name = name || dog.name
          dog.age = age || dog.age

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          const responseBody = JSON.stringify(dog);
          return res.end(responseBody);
        }
      }
    }

    // DELETE /dogs/:dogId
    if (req.method === "DELETE" && req.url.startsWith("/dogs/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here

        /*
        get index of dog
        verify dog exists
         splice the dog  

         set status code
         set header
         return message
        */
        const dogIndex = dogs.findIndex((dog) => dog.dogId == dogId);
        if(dogIndex !== undefined){
          dogs.splice(dogIndex, 1);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          // return res.end(JSON.stringify({message:'Successfully deleted'}))
          return res.end('Successfully deleted')
        }

      }
      return res.end();
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end("Endpoint not found");
  });
});

if (require.main === module) {
  const port = 8000;
  server.listen(port, () => console.log("Server is listening on port", port));
} else {
  module.exports = server;
}
