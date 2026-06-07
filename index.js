// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// static files
app.use(express.static('public'));

// homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// helper
const isInvalidDate = (date) => date.toString() === "Invalid Date";

// ===============================
// TIMESTAMP MICROSERVICE
// ===============================
app.get("/api/:date?", function (req, res) {
  let date;

  // ✅ FIX: handle empty date FIRST
  if (!req.params.date) {
    date = new Date();
  } else {
    date = new Date(req.params.date);

    // fallback for unix timestamp
    if (isInvalidDate(date)) {
      date = new Date(Number(req.params.date));
    }
  }

  // invalid date check
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// (optional, can stay or be removed — not needed anymore)
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// listen
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
