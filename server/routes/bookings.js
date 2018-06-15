var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds121889.mlab.com:21889/taxiapp', ["bookings"]);

router.get("/bookings", function (req, res, next) {
  db.bookings.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  })
});

router.post("/bookings", function (req, res, next) {
  var booking = req.body.data;
  var nearByDriver = req.body.nearByDriver;
  var io = req.app.io;

  if(!booking.userName) {
    res.status(400);
    res.json({
      error:"Bad Data"
    });
  } else {
    db.bookings.save(booking, function(err, savedBooking) {
      if(err) {
        res.send(err);
      }
      res.json(savedBooking);
      if(nearByDriver.socketId){
        io.emit(nearByDriver.socketId + "driverRequest", savedBooking);
        console.log("Driver connected!");
      }else{
        console.log("Driver not connected");
      }
    });
  }
});
module.exports = router;