const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const axios = require('axios');

//upload multer handler
const multer      = require("multer");
const cloudinary = require('cloudinary');
const request     = require("request");


const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    //accept image files only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFilter});

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [ auth, [
	check('text', 'Text is required').not().isEmpty()
] ], async(req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			image: req.body.image,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		});
		
		const post = await newPost.save();
		
		res.json(post);

	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/likesnotification
// @desc    Get number of likes notifications
// @access  PRIVATE
router.get('/likes_notification/:userId', auth, async(req, res) => {
	try {
		// notif for likes
		const likesNotif = await 
			Post.findOne({ user: req.params.userId }).distinct('likes'); // get likes query
		
		await res.json(likesNotif);
	} catch(err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/notification
// @desc    Get number of comments notifications
// @access  PRIVATE
router.get('/comments_notification/:userId', auth, async(req, res) => {
	try {
		// notif for comments
		const commentsNotif = await 
			Post.findOne({ user: req.params.userId }).distinct('comments'); // get comments query
		
		await res.json(commentsNotif);
	} catch(err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/posts/image
// @desc     Upload an image
// @access   Private
router.post('/image', upload.single('image'), auth, async (req, res) => {

	try {
  		const result = await cloudinary.v2.uploader.upload(req.file.path);
  		res.send(result);
	} catch(err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/posts
// @desc     Get individual post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check User
		if(!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.json(post);
	} catch(err) {

		if(err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}

		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/user/posts
// @desc     Get user's post by ID
// @access   Private
router.get('/user/:id', auth, async (req, res) => {
	try {
		const post = await Post.find({ user: req.params.id });

		if(!post) {
			return res.status(500).json({ msg: 'No posts to show' })
		}

		res.json(post);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/posts
// @desc     Delete a post by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check user
		if(post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" })
		}

		if(!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		await post.remove();

		res.json({ msg: "Post removed" });
	} catch(err) {
		if(err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}

		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/posts/
// @desc   	 Delete all posts
// @access   Private
router.delete('/', auth, async (req,res) => {
	try {
		const post = await Post.deleteMany();

		res.json(post);
	} catch(err) {
		console.error(err);
	}
});

// @route    PUT api/posts/like/:id
// @desc   	 Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const user = await User.findById(req.user.id).select('-password'); // to get the name of the user

		console.log(user + ' ' + 'this is query user');
		console.log('this is' + ' ' + user.name + ' ' + 'username');

		// Check if the post has already been liked by user
		if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: "Post already liked" });
		}
		
		// Like a post
		post.likes.unshift({
			user: req.user.id,
			name: user.name,
			avatar: user.avatar,
			post_id: req.params.id,
			date: new Date
		});
		await post.save();

		res.json(post.likes);
	} catch(err) {
		console.err(err.message);
	}
});

// @route    PUT api/posts/like/:id
// @desc   	 Like a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if the post has already been liked by user
		if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: "Post has not yet been liked" });
		}

		//Get remove index
		const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);
		await post.save();

		res.json(post.likes);
	} catch(err) {
		console.error(err.message);
	}
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', [ auth, [
	check('text', 'Text is required').not().isEmpty()
] ], async (req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select('-password');
		const post = await Post.findById(req.params.id);

		const newComment = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			post_id: req.params.id,
			user: req.user.id
		};

		post.comments.unshift(newComment);
		await post.save();

		res.json(post.comments);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		//Pull out comment
		const comment = post.comments.find(comment => comment.id === req.params.comment_id);

		// make sure if comment exist
		if(!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		// Check user
		if(comment.user.toString() !== req.user.id) {
			return res.status(404).json({ msg: "User not authourized" });
		}

		//Get remove index
		const removeIndex = post.comments
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);
		await post.save();

		res.json(post.comments);
	} catch(err) {
		console.error(err.message);
	}
});

module.exports = router;