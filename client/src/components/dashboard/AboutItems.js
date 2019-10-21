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


const AboutItems = ({ 
	profile: {profile, loading}
}) => {

	const handleEditPicture = () => {
		const fileInput = document.getElementById('edit-profile');
		fileInput.click();
	};

	return (
		<div className="about-container">
			<UploadAvatar/>
			<div class="about-row">
				<div className="about-col-1">
					<div className="about-content">
						<span className="about-name">{profile.user.name}</span>
					</div><br/>
					<div className="about-content">
						<LocationOnIcon className="about-icons"/>
						<span className="about-items">{profile.location}</span>
					</div>
					<div className="about-content"> 
						<CodeIcon className="about-icons"/>
						<span className="about-items">{profile.strongest_skill}</span>
					</div>
					<div className="about-content"> 
						<ScheduleIcon className="about-icons"/>
						<span className="about-items">
							Joined on&nbsp;
							<Moment className="post-date" format="YYYY/MM/DD">{profile.date}</Moment>
						</span>
					</div>
				</div>
				<div className="about-col-2">
					<Link 
						to="/edit-profile" 
						className="profile-btn"
						id="edit-profile"
						hidden="hidden"
					>
					Edit Profile
					</Link>
					<IconButton onClick={handleEditPicture} className="avatar-btn">
						<EditIcon color="primary"/>
					</IconButton>
				</div>
			</div>
		</div>
	);
};

AboutItems.propTypes = {
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{}
)(AboutItems);
