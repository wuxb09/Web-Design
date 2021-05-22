var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

//The plugin automatically adds username and password (salt/hashed) into schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);