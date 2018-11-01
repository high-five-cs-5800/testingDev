var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{
	type: String,
	required: true
    },
    password:{
	type: String,
	required: true
    },
    user_type:{
	type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    }
});
//export the model schema.
module.exports = UserSchema;
