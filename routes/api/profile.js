const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async(req,res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar']);

		if(!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
});

// @route    POST api/profile
// @desc     Create and update users profile
// @access   Private
router.post('/', 
	auth, 
	// 	[
	// 		check('skills', 'Skills is required')
	// 			.not()
	// 			.isEmpty()
	// 	]
	// ], 
	async(req,res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		
		// Pull the fields from Profile model
		const {
			age,
			company,
			location,
			strongest_skill,
			githubusername,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if(age) profileFields.age = age;
		if(company) profileFields.company = company;
		if(location) profileFields.location = location;
		if(strongest_skill) profileFields.strongest_skill = strongest_skill;
		if(githubusername) profileFields.githubusername = githubusername;

		//Build social object
		profileFields.social = {};
		if(youtube) profileFields.social.youtube = youtube;
		if(facebook) profileFields.social.facebook = facebook;
		if(twitter) profileFields.social.twitter = twitter;
		if(instagram) profileFields.social.instagram = instagram;
		if(linkedin) profileFields.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			
			// if a profile is found, update it
			if(profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id }, 
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			// if it's not found, Create a profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);

		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async(req,res) => {
	try {
		const profiles = await Profile
			.find()
			.populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/user_id
// @desc     Get profile by user id
// @access   Public
router.get('/:user_id', async(req,res) => {
	try {
		const profile = await Profile
			.findOne({ user: req.params.user_id })
			.populate('user', ['name', 'avatar']);
		if(!profile) return res.status(400).json({ msg: 'Profile not found'});
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/profile/user_id
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/:id', auth, async(req,res) => {
	try {
		// Remove user posts
		await Post.deleteMany({ user: req.user.id });
		
		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove user
		await User.findOneAndRemove({ _id: req.user.id });
		
		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// EXPERIENCE CONTROLLER

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', [
	auth, 
	[
		check('title', 'Title is required')
			.not()
			.isEmpty(),
		check('company', 'company is required')
			.not()
			.isEmpty(),
		check('from', 'From date is required')
			.not()
			.isEmpty()
	] 
], async(req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	// pull experience fields from Profile
	const {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	} = req.body;
	
	// create a var with new fields
	const newExp = {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	}

	try {
		const profile = await Profile.findOne({ user: req.user.id });

		profile.experience.unshift(newExp);
		await profile.save();
		res.json(profile);

	} catch(err) {	
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req,res) => {
	try {

		//Find user id from profile
		const profile = await Profile.findOne({ user: req.user.id });

		//Get remove index
		const removeIndex = profile.experience.map(item => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);
		await profile.save();
		
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});



// EDUCATION CONTROLLER

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', [
	auth, 
	[
		check('school', 'school is required')
			.not()
			.isEmpty(),
		check('degree', 'degree is required')
			.not()
			.isEmpty(),
		check('fieldofstudy', 'fieldofstudy is required')
			.not()
			.isEmpty(),
		check('from', 'from Date is required')
			.not()
			.isEmpty()
	] 
], async(req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	// pull education fields from Profile
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	} = req.body;

	const newEducation = {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	};

	try {
		const profile = await Profile.findOne({ user: req.user.id });

		profile.education.unshift(newEducation);
		await profile.save();
		res.json(profile);

	} catch(err) {	
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/profile/education/:exp_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:exp_id', auth, async (req,res) => {
	try {

		//Find user id from profile
		const profile = await Profile.findOne({ user: req.user.id });

		//Get remove index
		const removeIndex = profile.education.map(item => item.id)
			.indexOf(req.params.exp_id);

		profile.education.splice(removeIndex, 1);
		await profile.save();
		
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/github/username
// @desc     GET user repos from Github
// @access   Public
router.get('/github/:username', (req,res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
			method: 'GET',
			headers: { 'user-agent' : 'node.js' }
		};

		request(options, (error, response, body) => {
			if(error) console.error(error);

			if(response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' });
			}

			res.json(JSON.parse(body));
		});
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


module.exports = router;