var mongoose = require('mongoose');

var Contact  =  new mongoose.Schema({
	contact_ID:{
		type: Number,
		required: true
	},
	First:{
		type: String,
		required: true
	},
	Last:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	company:{
		type: String,
		required: true
	},
	phone_number:{
		type: String,
		required: true
	}
});

var Keyword = new mongoose.Schema({
	word:{
	     type: String,
	     required: false
	}
});

var CaseSchema = new mongoose.Schema({
    case_number:{
	type: Number,
	required: true
    },
    contacts: [Contact],
    case_type: {
	type: Number,
        min: 0,
	required: true
    },
    case_purpose: {
	type: String,
	default: 'pre',
	required: false
    },
    subject: {
	type: String,
	required: true
    },
    product_line: {
	type: String,
	required: true
    },
    keywords: [Keyword],
    Archive: {
	type: Boolean,
        default: false,
	required: true
    }
});
//export the model schema.
module.exports = CaseSchema;
