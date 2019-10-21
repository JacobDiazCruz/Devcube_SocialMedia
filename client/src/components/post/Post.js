import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

import { 
	likesNotification,
	commentsNotification 
} from '../../actions/notification';

const Post = ({ 
	auth: { user },
	getPost, 
	post: { post, loading },
	match 
}) => {

	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);

	return loading || post === null ? ( <Spinner /> ) :
	( 
		<div className="single-post-page">
			<div className="single-post-page-row">
				<div className="single-post-page-col-1">
					<Link to="/posts">
						<button className="go-back-btn">&#8249; Back</button>
					</Link>
					<PostItem post={post} showActions={false} />
					<div className="comments">
						<div className="comment-item-container">
							{post.comments.map(comment => (
								<CommentItem 
									key={comment._id} 
									comment={comment} 
									postId={post._id}
								/>
							))}
							<CommentForm postId={post._id} />
						</div>
					</div>
				</div>
				<div className="single-post-page-col-2">
					
				</div>
			</div>
		</div>
	);
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps, 
	{ getPost }
)(Post);