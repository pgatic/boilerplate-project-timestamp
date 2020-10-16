// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


// /api/timestamp/:date_string endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {
  var timestamp;
  if (req.params.date_string == null) {
    timestamp = new Date();
  } else if (/^[0-9]*$/g.test(req.params.date_string)) {
    timestamp = new Date(parseInt(req.params.date_string, 10));
  } else {
    timestamp = new Date(req.params.date_string);
  }

  var unixTime = timestamp.getTime();
  if (Number.isNaN(unixTime)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: unixTime, utc: timestamp.toUTCString() });
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
