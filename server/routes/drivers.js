var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds121889.mlab.com:21889/taxiapp', ["drivers"]);


//Get Single Driver
router.get("/driver/:id", function (req, res, next) {
  db.drivers.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, driver) {
    if (err) {
      res.send(err);
    }
    res.send(driver);
  });
});

module.exports = router;