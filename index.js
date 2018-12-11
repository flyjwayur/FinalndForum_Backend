const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = process.env.PORT || 3010;
const app = express();

//morgan will log sufficient info
app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/posts", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  //look for additional spec and match /posts end point
  next();
});

app.get("/posts", (req, res, next) => {
  //input param req, res from the app.all cuz app.all has next()
  res.end("Will send all the posts to you :D");
});

app.post("/posts", (req, res, next) => {
  res.end(
    "Will add the post: " +
      req.body.title + " " +
      req.body.category +
      " with details " +
      req.body.body
  );
});

app.put("/posts", (req, res, next) => {
  res.statusCode = 403;
  res.end("Put poeration is not supported on /posts");
});

app.delete('/posts', (req, res, next) => {
  res.end('Deleting all the dishes!');
});

//Support by id
app.get("/posts/:postId", (req, res, next) => {
  const postId = req.params.postId;
  res.end("Will send details of the posts :" + postId+ "to you :D");
});

app.post("/posts/:postId", (req, res, next) => {
  res.statusCode = 403;
  const postId = req.params.postId;
  res.end(
   'POST operation not supported on /posts/' + postId
  );
});

app.put("/posts/:postId", (req, res, next) => {
  const postId = req.params.postId;
  res.write('Updating the dish: ' + postId);
  res.end("Will update the dish: " + req.body.title + "under category", req.body.category+ 'with details' + req.body.body);
});

app.delete('/posts/:postId', (req, res, next) => {
  const postId = req.params.postId;
  res.end('Deleting dish!' + postId);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
