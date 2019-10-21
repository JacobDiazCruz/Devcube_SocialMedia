import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LikesNotification = ({ likes: {
	name,
	user,
	avatar,
	post_id
} }) => {
	return (
		<Fragment>
			<Link to={`posts/${post_id}`} className="notification-link">
				<div className="notification-box">
					<img src={avatar} className="notification-avatar"/>&nbsp;
					<span className="notification-name">{name}</span>&nbsp;
					<span className="notification-caption">Liked your post</span>
				</div>
			</Link>
		</Fragment>
	);
}

LikesNotification.propTypes = {
	likes: PropTypes.object.isRequired
}

export default connect(null)(LikesNotification);