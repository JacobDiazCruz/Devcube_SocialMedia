import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {

	const [ text, setText ] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		addComment(postId, { text });
		setText('');
	};

	return (
		<form onSubmit={e => onSubmit(e)} className="create-comment-form">
			<input
				type="text" 
				placeholder="Write a comment..." 
				name="text"
				className="create-comment-input"
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<br/>
			<button className="btn btn-comment">Comment</button>
		</form>
	);
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);