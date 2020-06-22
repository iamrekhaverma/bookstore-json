const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes/routes.js');

// mount the router on the app
app.use('/', router)

const server = app.listen(8080, () => {
    console.log('listening on port %s...', server.address().port);
});