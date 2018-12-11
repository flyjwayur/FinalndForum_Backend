const express = require('express');
const bodyParser = require('body-parser');

const postsRouter = express.Router();

postsRouter.use(bodyParser.json());

postsRouter.route('/posts')
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
  res.end("Put operation is not supported on /posts");
})
.delete((req, res, next) => {
  res.end('Deleting all the dishes!');
});

//REST API supported by id
postsRouter.route('/posts/:postId')
.get((req, res, next) => {
  const postId = req.params.postId;
  res.end("Will send details of the posts :" + postId+ "to you :D");
})
.post((req, res, next) => {
  res.statusCode = 403;
  const postId = req.params.postId;
  res.end(
  'POST operation not supported on /posts/' + postId
  );
})
.put((req, res, next) => {
  const postId = req.params.postId;
  res.write('Updating the dish: ' + postId);
  res.end("Will update the dish: " + req.body.title + "under category", req.body.category+ 'with details' + req.body.body);
})
.delete((req, res, next) => {
  const postId = req.params.postId;
  res.end('Deleting dish!' + postId);
});

module.exports = postsRouter;
