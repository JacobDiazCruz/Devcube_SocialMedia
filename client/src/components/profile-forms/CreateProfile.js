import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UploadAvatar from '../dashboard/UploadAvatar';
import { Link, Redirect } from 'react-router-dom';

// actions
import { createProfile } from '../../actions/profile'; 

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CodeIcon from '@material-ui/icons/Code';
import ScheduleIcon from '@material-ui/icons/Schedule';

// Edit icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'

const CreateProfile = ({ 
	createProfile, 
	history, 
	profile: {profile, loading} 
}) => {

	// component state
	const [formData, setFormData] = useState({
		age: '',
		company: '',
		location: '',
		strongest_skill: '',
		githubusername: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
	});

	const {
		age,
		company,
		location,
		strongest_skill,
		githubusername,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const onChange = e => setFormData({
		...formData,
		[e.target.name] : e.target.value
	});

	const handleEditPicture = () => {
		const fileInput = document.getElementById('edit-profile');
		fileInput.click();
	};

	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<div className="edit-profile">
			<div className="about-container">
			<UploadAvatar/>
				<div className="about-row">
					<div className="about-col-1">
						<div className="about-content">
							<span className="about-name">{profile ? profile.user.name : null}</span>
						</div>
						<form onSubmit={e => onSubmit(e)}>
							<div className="about-content">
								<input 
									type="number" 
									placeholder="Age"
									name="age"
									value={age}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Strongest Skill"
									name="strongest_skill"
									value={strongest_skill}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="School" 
									name="company"
									value={company}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Location" 
									name="location"
									value={location}
									onChange={e => onChange(e)} 
								/>
							</div>

							<div className="about-content">
								<input 
									type="text" 
									placeholder="Facebook" 
									name="facebook"
									value={facebook}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Github" 
									name="githubusername"
									value={githubusername}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Twitter" 
									name="twitter"
									value={twitter}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="LinkedIn" 
									name="linkedin"
									value={linkedin}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Youtube" 
									name="youtube"
									value={youtube}
									onChange={e => onChange(e)} 
								/>
							</div>
							<div className="about-content">
								<input 
									type="text" 
									placeholder="Instagram" 
									name="instagram"
									value={instagram}
									onChange={e => onChange(e)} 
								/>
							</div>
							<button className="btn-purple-sm">Save</button>
						</form>
					</div>
					<div className="about-col-2">
						<Link 
							to="/dashboard" 
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
		</div> 
	);
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps, 
	{createProfile}
)(withRouter(CreateProfile));