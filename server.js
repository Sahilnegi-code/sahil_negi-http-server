const http = require("http");
const url = require("url");
const uuid4 = require("uuid4");

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);
  let pathName = parsedUrl.pathname;

  // Handle different endpoints based on the request path
  if (pathName === "/GET/html" && req.method === "GET") {
    // Respond with an HTML page
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(`<!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
            <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
            <p> - Martin Fowler</p>
        </body>
      </html>`);
  } else if (pathName === "/GET/json" && req.method === "GET") {
    // Respond with JSON data
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(`{
      "slideshow": {
        "author": "Yours Truly",
        "date": "date of publication",
        "slides": [
          {
            "title": "Wake up to WonderWidgets!",
            "type": "all"
          },
          {
            "items": [
              "Why <em>WonderWidgets</em> are great",
              "Who <em>buys</em> WonderWidgets"
            ],
            "title": "Overview",
            "type": "all"
          }
        ],
        "title": "Sample Slide Show"
      }
    }`);
  } else if (pathName === "/GET/uuid" && req.method === "GET") {
    // Respond with a generated UUID
    let getUuid = uuid4();
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(`{
      "uuid": "${getUuid}"
    }`);
  } else if (pathName.includes("/GET/status") && req.method === "GET") {
    // Extract the status code from the URL and respond with a message
    let status = pathName.split("/")[2];
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end(` ${status} status code .`);
  } else if (pathName.includes("/GET/delay") && req.method === "GET") {
    // Extract the delay time from the URL and respond after the specified delay
    let delay = Number(pathName.split("/")[2]);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    setTimeout(() => {
      res.end(`  <h1>200 Status Code</h1>`);
    }, delay * 1000);
  } else {
    // Handle 404 for unknown endpoints
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end('Not Found');
  }
  
});

const port = 8000;
server.listen(port, () => {
  console.log("Server Started ");
});
