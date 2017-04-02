var express = require('express');
var router = express.Router();

var Blood = require('../models/blood');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user);
});

router.get('/getall', function(req, res, next) {
  Blood.getAll(function(docs) {
    return res.send(docs);
  })
});

router.post('/donate', function(req, res, next) {
  var username = req.user.username;
  var group = req.body.group;
  var amount = req.body.amount;
  var location = req.user.location;
  var mobile = req.user.mobile;

  // Form Validator
  req.checkBody('group','Blood Group is required').notEmpty();
  req.checkBody('amount','Blood Amount field is required').notEmpty();

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('donate', {
  		errors: errors,
      user: req.user
  	});
  } else{
  	var newBlood = new Blood({
      username: username,
      group: group,
      amount: amount,
      location: location,
      mobile: mobile,
    });

    Blood.createBlood(newBlood, function(err, blood){
      if(err) throw err;
      console.log(blood);
    });

    req.flash('success', 'Blood Sample addded to the Blood Bank');
    res.render('donate', {user:req.user});
  }
});

router.post('/findblood', function(req, res, next) {
  var group = req.body.group;
  var location = req.body.location;

  console.log(group);
  console.log(location);

  if(group && !location){
    Blood.getBloodByGroup(group, function(err, bloods){
      if(err) throw err;
      console.log(bloods);
      console.log('getBloodByGroup');
      res.render('findblood', {title:'Blood Bank Details', bloods: bloods, user:req.user});
    });
  }
  if(group && location){
    Blood.getBloodByBoth(group, location, function(err, bloods){
      if(err) throw err;
      console.log(bloods);
      console.log('getBloodByBoth');
      res.render('findblood', {title:'Blood Bank Details', bloods: bloods, user:req.user});
    });
  }

});

module.exports = router;
