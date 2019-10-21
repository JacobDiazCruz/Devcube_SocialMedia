import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	ACCOUNT_DELETED,
	CLEAR_PROFILE
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {

	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
};

// Upload Image
export const uploadAvatar = formData => async dispatch => {
	try {

		console.log(formData + 'this is the image data');

		const res = await axios.patch('/api/users/upload-image', formData);

		console.log(res + 'this is image result');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		// dispatch(setAlert('Post Created', 'success'))	;
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get profile by id
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch(err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		console.log(formData + ' this is log');

		const res = await axios.post('/api/profile', formData, config);

		console.log(res.data + ' this is profile res data');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});


		if(!edit) {
			history.push('/dashboard');
		} else {
			history.push('/dashboard');
		}
		
		// dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

	} catch(err) {
		const errors = err.response.data.error;

		// dispatch alert message if error occurs
		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete account & profile
export const deleteAccount = id => async dispatch => {
	if(window.confirm('Are you sure to delete your account?')) {
		try {
			await axios.delete(`/api/profile/${id}`);

			dispatch({type: CLEAR_PROFILE});
			dispatch({type: ACCOUNT_DELETED});

			dispatch(setAlert('Your account has been permanently deleted'));
		} catch(err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		}
	}
};
