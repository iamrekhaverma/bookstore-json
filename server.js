const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var catalogRouter = require("./api/routes/catalog");

// mount the router on the app
// app.use('/', router);
app.use("/", catalogRouter); // Add catalog routes to middleware chain
app.use(errorHandler);

// The default error handler
function errorHandler(err, req, res, next) {
  res.status(500).send(err);
}

const server = app.listen(8080, () => {
  console.log("listening on port %s...", server.address().port);
});
