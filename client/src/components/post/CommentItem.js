import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
	postId,
	auth,
	deleteComment,
	comment: { _id, text, name, avatar, user, date }
}) => {

	return (
		<div className="comment-box">
			<div className="comment-left">
				<Link to={`/profile/${_id}`} className="comment-name">
					<img src={avatar} className="comment-round-avatar"/>
				</Link>
			</div>
			<div className="comment-middle">
				<Link to={`/profile/${_id}`} className="comment-name">
					<h2 className="comment-content">{name}</h2>
				</Link>
				<p className="comment-content">{text}</p>
				<Moment className="comment-content" format="YYYY/MM/DD">{date}</Moment>
			</div>
			<div className="comment-right">
				{!auth.loading && user === auth.user._id && (
					<button 
						onClick={e => deleteComment(postId, _id)}
						type="button"
					>
						Remove
					</button>
				)}
			</div>
		</div>
	);
}

CommentItem.propTypes = {
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);