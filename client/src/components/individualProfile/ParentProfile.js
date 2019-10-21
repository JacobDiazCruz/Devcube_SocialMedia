import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import DashboardPosts from '../dashboard/dashboardPosts/DashboardPosts';

const Profile = ({ getProfileById, profile: {profile, loading}, auth, match }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById]);

	return(
		<div className="profile-page">
			<div class="profile-page-col-1">
				{profile === null || loading ? <Spinner/> : 
					<Fragment>
						<div className="profile-grid">
							<ProfileTop profile={profile} user={auth.user} auth={auth}/>
						</div>
					</Fragment>
				}
			</div>
			<div className="profile-page-col-2">
				<DashboardPosts />
			</div>
		</div>
	);
}

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired, 
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getProfileById }
)(Profile);