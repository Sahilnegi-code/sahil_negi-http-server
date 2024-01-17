const http = require("http");
const path = require("path");
const url = require("url");
const uuid4 = require("uuid4");
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathName = parsedUrl.pathname;
  if (pathName == "GET/html" && req.method == "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.statusCode = 200;
    res.end(`<!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
              <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
              <p> - Martin Fowler</p>
        
          </body>
        </html>`);
  } else if (pathName == "GET/json" && req.method == "GET") {
    {
      res.writeHead(200, {
        "Content-Type": "text/json",
      });
      res.statusCode = 200;
      res.end(`"slideshow": {
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
        }`);
    }
  } else if (parsedUrl.pathname == "GET/uuid" && req.method == "GET") {
    let getUuid = uuid4();
    res.writeHead(200, {
      "Content-Type": "text/json",
    });
    res.statusCode = 200;
    console.log("uuid", getUuid);
    res.end(`{
      uuid: ${getUuid},
}`);
  } else if (parsedUrl.pathname.includes("GET/status") && req.method == "GET") {
    let status = parsedUrl.pathname.split("/")[2];
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.statusCode = 200;
    res.end(` ${status} status code .`);
  } else if (parsedUrl.pathname.includes("GET/delay") && req.method == "GET") {
    let delay = Number(parsedUrl.pathname.split("/")[2]);
    console.log(delay);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.statusCode = 200;
    setTimeout(() => {
      res.end(`  <h1>200 Status Code</h1>`);
    }, delay * 1000);
  }
});

const port = 8000;
server.listen(port, () => {
  console.log("Server Started ");
});
