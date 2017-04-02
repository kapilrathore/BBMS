var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/landing');
}

router.get('/details', function(req, res, next) {
  res.render('details',{title:'User Details', user:req.user});
});

router.get('/donate', function(req, res, next) {
  res.render('donate',{title:'Donate Blood'});
});

router.get('/findblood', function(req, res, next) {
  res.render('findblood',{title:'Find Blood Sample', bloods: []});
});

module.exports = router;
