import axios from 'axios';
import { setAlert } from './alert';
import {
	LIKES_NOTIF,
	LIKES_NOTIF_ERROR,
	CLEAR_LIKES_NOTIF,
	COMMENTS_NOTIF,
	COMMENTS_NOTIF_ERROR,
	CLEAR_COMMENTS_NOTIF
} from '../actions/types';


// get likes notif
export const likesNotification = id => async dispatch => {
	try {

		console.log(`${id} this is the id`);

		const res = await axios.get(`/api/posts/likes_notification/${id}`);

		console.log(res + 'this is result');

		dispatch({
			type: LIKES_NOTIF,
			payload: res.data
		});

	} catch(err) {
		dispatch({
			type: LIKES_NOTIF_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// get comments notif
export const commentsNotification = id => async dispatch => {
	try {

		console.log('this is working');

		const res = await axios.get(`/api/posts/comments_notification/${id}`);

		console.log(res + 'this is result');

		dispatch({
			type: COMMENTS_NOTIF,
			payload: res.data
		});

	} catch(err) {
		dispatch({
			type: COMMENTS_NOTIF_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};