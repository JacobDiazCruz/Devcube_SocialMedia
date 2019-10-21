import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
	likesNotification,
	commentsNotification 
} from '../../actions/notification';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import LikesNotification from './LikesNotification';
import CommentsNotification from './CommentsNotification';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const Notification = ({
	likesNotification,
	commentsNotification,
	notification: { likesNotif, commentsNotif, loading },
	auth: {user}
}) => {

	useEffect(() => {
		likesNotification(user._id);
		commentsNotification(user._id);
	}, [likesNotification, commentsNotification]);

	return loading ? <Spinner/> :
		<div>
			{likesNotif.map(likes => (
				<LikesNotification likes={likes} key={likes._id} />
			))}
			{commentsNotif.map(comments => (
				<CommentsNotification comments={comments} key={comments._id} />
			))}
		</div>
	;
};

Notification.propTypes = {
	likesNotification: PropTypes.func.isRequired,
	commentsNotification: PropTypes.func.isRequired,
	notification: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	notification: state.notification,
	auth: state.auth
});


export default connect(
	mapStateToProps, 
	{ likesNotification, commentsNotification }
)(Notification);