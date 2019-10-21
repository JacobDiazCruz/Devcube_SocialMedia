import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red, white, grey } from '@material-ui/core/colors';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { 
	likesNotification,
	commentsNotification 
} from '../../actions/notification';
import SvgIcon from '@material-ui/core/SvgIcon';
import NavLogo from '../../images/logo.png';
import Notification from '../notification/Notification.js';

//Navbar List Components
import AuthNavbarList from './navbarLists/AuthNavbarList';

const Navbar = ({ 
	auth: { 
	isAuthenticated, 
	loading, 
	user },
	logout,
	likesNotification,
	commentsNotification
}) => {

	const authLinks = (
		<ul className="auth-links">
			<AuthNavbarList />
		</ul>
	);

	const guestLinks = (
		<ul className="guest-links">
			<li>
				<Link to ="/login" className="nav-items"><p>Login</p></Link>
			</li>
			<li>
				<Link to ="/" className="nav-items"><p>Register</p></Link>
			</li>
		</ul>
	);

	return (
		<div className="navbar">
			<div className="nav-flex">
				<div className="nav-col-1">
					<img src={NavLogo} className="nav-logo"/>
				</div>
				<div className="nav-col-2">
					<ul>
						{ !loading && (
							<Fragment>
								{ isAuthenticated ? authLinks : guestLinks}
							</Fragment>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}


Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	likesNotification: PropTypes.func.isRequired,
	commentsNotification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth
});	

export default connect(
	mapStateToProps, 
	{ 
		likesNotification,
		commentsNotification 
	}
)(Navbar);