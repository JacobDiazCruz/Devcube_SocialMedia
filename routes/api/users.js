const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const passport = require('passport');
const passportGoogle = passport.authenticate('googleToken', { session: false });
const JWT_SECRET = require('../../config');
const sharp = require('sharp');
const auth = require('../../middleware/auth');

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

const jwt_pass = 'defaultstring';

signToken = user => {
  return jwt.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, jwt_pass);
}

// @route POST api/users
// @desc Register user
// @access Public
// set validation
router.post('/', 
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Please enter password with 6 or more characters')
		.isLength({min: 6})
	],
	async(req,res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {name, email, password} = req.body;

		try {
			//See if user exists
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ error: [{ msg: 'User already exists'}] });
			}

			//Get users gravatar
			let avatar = "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1570822118/default_img_f35wsh.png";

			// generate register type
			const method = 'local'

			// generate a USER role
			const role = 2;

			user = new User({
				name,
				email,
				avatar,
				password,
				role
			});

			//NOTE TO ENCRYPT USER ROLE
			// const roleSalt = await bcrypt.genSalt(10);
			// user.role = await bcrypt.hash(role, roleSalt);

			//Encrypt password and save
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			//Return jwt
			//Note: we could use id because mongoose has id and not __id
			const payload = {
				user: {
					id: user.id
				}
			}
			
			// sign the token pass payload, secret and draw callback
			jwt.sign(payload, config.get('jwtSecret'), 
			{ expiresIn: 360000 },
			(err, token) => {
				if(err) throw err; 
				res.json({ token });
			});


		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
});

router.patch('/upload-image', upload.single('image'), auth, async (req, res) => {

	try {
  		const newAvatar = await cloudinary.v2.uploader.upload(req.file.path, function(err, res) {
  			console.log(err + ' this is err');
  			console.log(res + ' this is result');
  		});
  		console.log(newAvatar + ' this is new avatar path');
		
		const {avatar} = req.body;
			
		// Build user avatar object
		const userField = {};
		userField._id = req.user.id;
		userField.avatar = newAvatar.secure_url;

		let user = await User.findOne({ _id: req.user.id });

		// if a user is found, update it
		if(user) {
			user = await User.findOneAndUpdate(
				{ _id: req.user.id }, 
				{ $set: userField },
				{ new: true }
			);
			res.json(user);
		}
		
		await user.save();
		res.json(newAvatar);

	} catch(err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// google oauth token return
module.exports = googleOAuth = async (req, res, next) => {
	//Generate token
	console.log('req.user', req.user);

	const token = signToken(req.user);
	res.status(200).json({ token });
};

// google oauth
router.post('/oauth/google', passportGoogle, googleOAuth);

module.exports = router;