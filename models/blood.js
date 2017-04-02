var mongoose = require('mongoose');

// User Schema
var BloodSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	group: {
		type: String
	},
	amount: {
		type: String
	},
	location: {
		type: String
	},
	mobile: {
		type: String
	}
});

var Blood = module.exports = mongoose.model('Blood', BloodSchema);

module.exports.createBlood = function(newBlood, callback){
  newBlood.save(callback);
}

module.exports.getAll = function(callback){
  Blood.find({},function(err,docs){
    return callback(docs);
  })
}

module.exports.getBloodByGroup = function(group, callback){
	var query = {group: group};
	Blood.find(query, callback);
}

module.exports.getBloodByBoth = function(group, location, callback){
	var query = {group: group, location: location};
	Blood.find(query, callback);
}
