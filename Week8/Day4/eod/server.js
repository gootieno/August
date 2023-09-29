const http = require("http");
const fs = require("fs");

const comments = ["test comment"];

/*
    get all comments
    post a comment
*/

const server = http.createServer((req, res) => {
  console.log(req.method, " - ", req.url);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // Log the body of the request to the terminal
      console.log(req.body);
    }
    // index html
    if (req.method === "GET" && req.url === "/") {
      const htmlPage = fs.readFileSync("index.html", "utf-8");

      let commentsList = "";

      for (const comment of comments) {
        commentsList += `<li>${comment}</li>`;
      }

      // val ? true : false
      const responseBody = htmlPage.replace(
        /#{comments}/,
        comments.length ? commentsList : `<li>No Comment Created</li>`
      );

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

    //add comment
    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;

      comments.push(comment);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
