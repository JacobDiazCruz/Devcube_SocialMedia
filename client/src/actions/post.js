import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	GET_POST,
	DELETE_POST,
	ADD_POST,
	ADD_COMMENT,
	UPDATE_NOTIF,
	NOTIF_ERROR,
	CLEAR_NOTIF,
	USERS_POSTS,
	REMOVE_COMMENT
} from '../actions/types';


// Get posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: res.data
		});

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Like
export const addLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data }
		});

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Remove Like
export const removeLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data }
		});

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Create post
export const addPostText = text => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {

		const res = await axios.post('/api/posts', text, config);

		dispatch({
			type: ADD_POST,
			payload: res.data
		});

		// dispatch(setAlert('Post Created', 'success'))	;
	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Upload Image
export const addPostImage = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}

	try {

		console.log(formData + 'this is the image data');

		const res = await axios.post('/api/posts/image', formData, config);

		console.log(res + 'this is image result');

		dispatch({
			type: ADD_POST,
			payload: res.data
		});

		// dispatch(setAlert('Post Created', 'success'))	;
	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete post
export const deletePost = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/posts/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id
		});

		// dispatch(setAlert('Post Removed', 'success'));

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get single post
export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data
		});

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all user's posts
export const getUserPost = id => async dispatch => {

	console.log(`${id}` + ' this is the id');
	
	try {
		const res = await axios.get(`/api/posts/user/${id}`);

		dispatch({
			type: USERS_POSTS,
			payload: res.data
		});

		console.log(res.data + ' this is users posts');

	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Create comment
export const addComment = (postId, formData) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {

		console.log(formData + 'this is post');

		const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});

		// dispatch(setAlert('Post Created', 'success'))	;
	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {

		const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});

		dispatch(setAlert('Comment Removed', 'success'));
	} catch(err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};