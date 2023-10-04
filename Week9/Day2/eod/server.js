const http = require("http");
const fs = require("fs");

const comments = ["test comment"];

/*

    **may have to add get /comments
    change post route

    BUILD JS FILE
*/

const server = http.createServer((req, res) => {
  console.log(req.method, " - ", req.url);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    if (reqBody) {
      if (req.headers["content-type"] === "application/json") {
        req.body = JSON.parse(reqBody);
      } else {
        req.body = reqBody
          .split("&")
          .map((keyValuePair) => keyValuePair.split("="))
          .map(([key, value]) => [key, value.replace(/\+/g, " ")])
          .map(([key, value]) => [key, decodeURIComponent(value)])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
      }

      // Log the body of the request to the terminal
      console.log(req.body);
    }
    // index html
    if (req.method === "GET" && req.url === "/") {
      const responseBody = fs.readFileSync("index.html", "utf-8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(responseBody);
    }

    //index.css
    if (req.method === "GET" && req.url === "/static/index.css") {
      const responseBody = fs.readFileSync("index.css", "utf-8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      return res.end(responseBody);
    }

    //index.js
    if (req.method === "GET" && req.url === "/static/index.js") {
      const responseBody = fs.readFileSync("index.js", "utf-8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      return res.end(responseBody);
    }

    // get comments
    if (req.method === "GET" && req.url === "/comments") {
      const responseBody = comments;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ comments: responseBody }));
    }

    //add comment
    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;

      comments.push(comment);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ comment }));
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
