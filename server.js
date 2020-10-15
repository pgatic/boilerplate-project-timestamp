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

// /api/timestamp endpoint
app.get("/api/timestamp", function (req, res) {
  res.json({ unix: Date.now(), utc: Date() });
});

// /api/timestamp/:date_string endpoint
app.get("/api/timestamp/:date_string", function (req, res) {
  var dateString = req.params.date_string;

  // handling timestamps e.g. 1451001600000
  if (/\d{5,}/.test(dateString)) {
    dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else if (/\d{1,}/.test(dateString)) {
    res.json({ error: "Invaid Date" });
  }

  // handling date strings compliant with ISO-8601 e.g. 2015-12-25
  var dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invaid Date" });
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
