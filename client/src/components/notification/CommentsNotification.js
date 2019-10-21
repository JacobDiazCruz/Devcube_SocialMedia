import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CommentsNotification = ({ comments: {
	name,
	user,
	avatar,
	post_id
} }) => {
	return (
		<Fragment>
			<Link to={`posts/${post_id}`} className="notification-link">
				<div className="notification-box">
					<img src={avatar} className="notification-avatar"/>
					<span className="notification-name">{name}</span>
					<span className="notification-caption">Commented on your post</span>
				</div>
			</Link>
		</Fragment>
	);
}

CommentsNotification.propTypes = {
	comments: PropTypes.object.isRequired
}

export default connect(null)(CommentsNotification);