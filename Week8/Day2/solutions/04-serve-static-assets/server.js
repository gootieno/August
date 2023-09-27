const http = require("http");
const fs = require("fs");

const getContentType = (ext) => {
  // if (ext === "css") return "text/css";
  // else if (ext === "jpg") return "image/jpeg";
  // else return "text/plain";

  switch (ext) {
    case "css":
      return "text/css";
    case 'jpeg':
    case "jpg":
      return "image/jpeg";
    default:
      return "text/plain";
  }
};

const server = http.createServer((req, res) => {
  // Your code here

  if (req.method === "GET" && req.url.startsWith("/static")) {
    const urlParts = req.url.split("/static/");
    console.log("url parts ", urlParts);

    const assetPath = urlParts[1];
    const extension = assetPath.split(".")[1];

    console.log("extension ", extension);

    // if (extension === "css") res.setHeader("Content-Type", "text/css");
    // else if (extension === "jpg") res.setHeader("Content-Type", "text/css");
    // else res.setHeader("Content-Type", "text/plain");

    const responseBody = fs.readFileSync(`./assets/${assetPath}`);

    const contentType = getContentType(extension);

    res.setHeader("Content-Type", contentType);
    res.statusCode = 200;
    return res.end(responseBody);
  }

  // route handler for returning index.html
  if (req.method === "GET" && req.url === "/") {
    /*
      responseBody
      set status code
      set headers
    */
    const responseBody = fs.readFileSync("index.html", "utf-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(responseBody);
  }

  // if (req.method === "GET" && req.url === "/static/css/application.css") {
  //   const responseBody = fs.readFileSync(
  //     "./assets/css/application.css",
  //     "utf-8"
  //   );

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/css");
  //   return res.end(responseBody);
  // }

  // if (req.method === "GET" && req.url === "/static/images/dog.jpg") {
  //   const responseBody = fs.readFileSync("./assets/images/dog.jpg");

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "image/jpg");
  //   return res.end(responseBody);
  // }
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
