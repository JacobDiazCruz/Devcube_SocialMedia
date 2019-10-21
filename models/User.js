const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	method: {
		type: String,
		enum: 'google'
	},
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	avatar: {
		type: String
	},
	role: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	},
	google: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		}
	}
});

module.exports = User = mongoose.model('user', UserSchema);