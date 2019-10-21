import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import UploadAvatar from './UploadAvatar';
import Moment from 'react-moment';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CodeIcon from '@material-ui/icons/Code';
import ScheduleIcon from '@material-ui/icons/Schedule';

// Edit icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'


const NoProfilePage = ({ 
	profile: {profile, loading},
	auth: {user}
}) => {

	const handleEditPicture = () => {
		const fileInput = document.getElementById('create-profile');
		fileInput.click();
	};

	return (
		<div className="about-container">
			<UploadAvatar/>
				
			<div class="about-row">
				<div className="about-col-1">
					<div className="about-content">
						<span className="about-name">{user ? user.name : <p>No Name</p>}</span>
					</div><br/>
					<div className="about-content">
						<LocationOnIcon className="about-icons"/>
						<span className="about-items">N/A</span>
					</div>
					<div className="about-content"> 
						<CodeIcon className="about-icons"/>
						<span className="about-items">N/A</span>
					</div>
					<div className="about-content"> 
						<ScheduleIcon className="about-icons"/>
						<span className="about-items">
							Joined on&nbsp;
							<Moment className="post-date" format="YYYY/MM/DD">{user ? user.date : <p>No Date</p>}</Moment>
						</span>
					</div>
				</div>
				<div className="about-col-2">
					<Link 
						to="/create-profile" 
						className="profile-btn"
						id="create-profile"
						hidden="hidden"
					>
					Create Profile
					</Link>
					<IconButton onClick={handleEditPicture} className="avatar-btn">
						<EditIcon color="primary"/>
					</IconButton>
				</div>
			</div>
		</div>
	);
};

NoProfilePage.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{}
)(NoProfilePage);
