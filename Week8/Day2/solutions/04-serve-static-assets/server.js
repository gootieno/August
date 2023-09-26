const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here

  // route handler for returning index.html



  
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));