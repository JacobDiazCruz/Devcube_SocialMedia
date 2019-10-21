const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	image: {
		type: String,
		required: false
	},
	text: {
		type: String
	},
	name: {
		type: String,
	},
	avatar: {
		type: String
	},
	likes: [
	    {
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			post_id: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			post_id: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);