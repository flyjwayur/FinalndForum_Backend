const express = require('express');
const bodyParser = require('body-parser');

const postsRouter = express.Router();

postsRouter.use(bodyParser.json());

postsRouter.route('/')
.all( (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  //look for additional spec and match /posts end point
  next();
})
.get((req, res, next) => {
  //input param req, res from the app.all cuz app.all has next()
  res.end("Will send all the posts to you :D");
})
.post((req, res, next) => {
  res.end(
    "Will add the post: " +
      req.body.title + " " +
      req.body.category +
      " with details " +
      req.body.body
  );
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end("Put poeration is not supported on /posts");
})
.delete((req, res, next) => {
  res.end('Deleting all the dishes!');
});


module.exports = postsRouter;
