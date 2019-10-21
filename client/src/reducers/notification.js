import {
	LIKES_NOTIF,
	CLEAR_LIKES_NOTIF,
	LIKES_NOTIF_ERROR,
	COMMENTS_NOTIF,
	CLEAR_COMMENTS_NOTIF,
	COMMENTS_NOTIF_ERROR
} from '../actions/types';

const initialState = {
	likesNotif: [],
	commentsNotif: [],
	loading: true
}

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case LIKES_NOTIF:
			return {
				...state,
				likesNotif: payload,
				loading: false
			};
		case CLEAR_LIKES_NOTIF:
			return {
				...state,
				likesNotif: payload,
				loading: false
			}
		case LIKES_NOTIF_ERROR:
			return {
				...state,
				likesNotif: payload,
				loading: false
			}
		case COMMENTS_NOTIF:
			return {
				...state,
				commentsNotif: payload,
				loading: false
			};
		case CLEAR_COMMENTS_NOTIF:
			return {
				...state,
				commentsNotif: payload,
				loading: false
			}
		case COMMENTS_NOTIF_ERROR:
			return {
				...state,
				commentsNotif: payload,
				loading: false
			}
		default:
			return state;
	}
}