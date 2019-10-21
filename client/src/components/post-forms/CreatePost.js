import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Notification from '../notification/Notification.js';

import { 
	likesNotification,
	commentsNotification 
} from '../../actions/notification';

// actions
import { addPostText, addPostImage } from '../../actions/post'; 

const CreatePost = ({ addPostText, addPostImage, auth: {user} }) => {
	const [text, setText] = useState('');

	const onSubmit = async e => {	
		e.preventDefault();

		// submit text
		addPostText({ text });
		setText('');

	};

	return (
		<Fragment>
			<form onSubmit={e => onSubmit(e)} className="create-post-form">
				<textarea
					rows="4"
					cols="50"
					placeholder="Write something..." 
					name="text"
					className="create-post-input"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<br/>
				<button className="btn btn-post">Post</button>
			</form>
		</Fragment>
	);
}

CreatePost.propTypes = {
	addPostText: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	addPostImage: PropTypes.func.isRequired,
	likesNotification: PropTypes.func.isRequired,
	commentsNotification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth
});	

export default connect(
	mapStateToProps,
	{addPostText, addPostImage, likesNotification, commentsNotification}
)(withRouter(CreatePost));