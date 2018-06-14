var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds121889.mlab.com:21889/taxiapp', ["driversLocation"]);

//update driver socket id
router.put("/driverLocationSocket/:id", function(req, res, next){
  var io = req.app.io;
  if(!req.body){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
    db.driversLocation.update({_id:mongojs.ObjectID(req.params.id)},
      {$set: {socketId:req.body.socketId}}, function(err, updateDetails) {
        if(err){
          res.send(err);
        }else{
          res.send(updateDetails);
        }
    });
  }
});

//get nearby driver
router.get("/driverLocation", function (req, res, next) {
  db.driversLocation.ensureIndex({"coordinate": "2dsphere"});
  db.driversLocation.find({
    "coordinate": {
      "$near": {
        "$geometry": {
          "type": "point",
          "coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
        },
        $maxDistance:10000
      }
    }
  }, function (err, location) {
    if (err) {
      res.send(err);
    } else {
      res.send(location);
    }
  });
});
module.exports = router;