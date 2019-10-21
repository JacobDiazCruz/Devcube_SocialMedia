import React, {userEffect, useState, Fragment} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

import SvgIcon from '@material-ui/core/SvgIcon';
import NavLogo from '../../../images/logo.png';
import Notification from '../../notification/Notification.js';

// Nav icons
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthNavbarList = ({
	auth: { 
	isAuthenticated, 
	loading, 
	user },
	logout
}) => {

	const [dropdown, setDropdown] = React.useState(false);

	// function handlers
	const dropdownClick = () => {
		setDropdown(prev => !prev);
	};

	return (
		<Fragment>
			<li>
				<Link to="/dashboard" className="nav-items">
					{user && <img src={user.avatar} className="round-avatar-sm"/> }
				</Link>
			</li>
			<li className="nav-li">
				<Link to="/posts">
					<HomeIcon className="auth-nav-items"/>
				</Link>
			</li>
			<li>
				{ user ?
					<NotificationsIcon 
					className="auth-nav-items" 
					onClick={dropdownClick}/> 
				: null }
			</li>

			{dropdown === true ?
			<div setOpen={setDropdown} id="notification-container">
				<Notification/>
			</div>
			: null }
			
			<li className="nav-li">
				<Link to="/profiles">
					<PeopleIcon className="auth-nav-items"/>
				</Link>
			</li>
			<li className="nav-li">
				<a 
				onClick={logout} 
				href="/login" 
				className="nav-items logout"
				>
				 <ExitToAppIcon className="auth-nav-items"/>
				</a>
			</li>
		</Fragment>
	);
};

AuthNavbarList.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
	auth: state.auth
});	

export default connect(mapStateToProps, {logout})(AuthNavbarList);
