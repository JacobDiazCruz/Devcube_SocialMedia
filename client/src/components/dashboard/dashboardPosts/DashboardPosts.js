import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserPost } from '../../../actions/post';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getPost, addLike, removeLike, deletePost } from '../../../actions/post';

import { makeStyles } from '@material-ui/core/styles';
import { blue, red, white, grey } from '@material-ui/core/colors';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import DashboardPostsItem from './DashboardPostsItem';

const DashboardPosts = ({ 
	profile, 
	auth,
	post: {user_posts},
	getUserPost
}) => {

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getUserPost('5d9bad4db101a192e45d1623');
	}, [getUserPost]);

	return (
		<div className="dashboard-post-container">
			{user_posts.map(user_post => (
				<DashboardPostsItem user_post={user_post} key={user_post._id} />
			))}
		</div>
	);	
};

DashboardPosts.propTypes = {
	getUserPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
	post: state.post
});

export default connect(
	mapStateToProps, 
	{getUserPost}
)(DashboardPosts);