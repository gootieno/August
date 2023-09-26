// Your code here
/*
    get response body
    set status code 
    set header
*/
const http = require('http');

const server = http.createServer((req, res) => {
  // ...
  
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));