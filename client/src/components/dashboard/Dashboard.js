import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getUserPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import UploadAvatar from './UploadAvatar';
import AboutItems from './AboutItems';
import NoProfilePage from './NoProfilePage';
import DashboardPosts from './dashboardPosts/DashboardPosts';

const Dashboard = ({ 
	getCurrentProfile, 
	getUserPost,
	deleteAccount, 
	auth: {user},
	profile: { profile, loading } 
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile, getUserPost]);

	return loading && profile === null ? <Spinner/> : 
	(
			<div className="dashboard-page">
				{profile !== null ? (
					<div className="dashboard-row">
						<div className="dashboard-col-1">
							<AboutItems/>
							<button 
								className="btn-danger" 
								onClick={()=> deleteAccount()}
							>
							Delete my Account
							</button>
						</div>

						<div className="dashboard-col-2">
							<DashboardPosts/>
						</div>
					</div>
				) : (
					<div className="dashboard-row">
						<div className="dashboard-col-1">
							<NoProfilePage/>
						</div>
						<div className="dashboard-col-2">
							<DashboardPosts/>
						</div>
					</div>
				)}
			</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	getUserPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps, 
	{ getCurrentProfile, deleteAccount, getUserPost }
)(Dashboard);