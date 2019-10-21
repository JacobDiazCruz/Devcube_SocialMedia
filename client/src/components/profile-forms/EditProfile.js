import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UploadAvatar from '../dashboard/UploadAvatar';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';

// actions
import { createProfile, getCurrentProfile } from '../../actions/profile';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CodeIcon from '@material-ui/icons/Code';
import ScheduleIcon from '@material-ui/icons/Schedule';

// Edit icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'

const EditProfile = ({ 
	profile: { profile, loading }, 
	createProfile, 
	getCurrentProfile, 
	history 
}) => {

	// component state
	const [formData, setFormData] = useState({
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

	// remember to set [loading] at the end because useffect always load
	useEffect(() => {
		getCurrentProfile();

		setFormData({
			company: loading || !profile.company ? '' : profile.company,
			location: loading || !profile.location ? '' : profile.location,
			strongest_skill: loading || !profile.strongest_skill ? '' : profile.strongest_skill,
			githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
			twitter: loading || !profile.social ? '' : profile.social.twitter,
			facebook: loading || !profile.social ? '' : profile.social.facebook,
			linkedin: loading || !profile.social ? '' : profile.social.linkedin,
			youtube: loading || !profile.social ? '' : profile.social.youtube,
			instagram: loading || !profile.social ? '' : profile.social.instagram
		});
	}, [loading, getCurrentProfile]);

	const {
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

	const handleEditPicture = () => {
		const fileInput = document.getElementById('edit-profile');
		fileInput.click();
	};

	const onChange = e => setFormData({
		...formData,
		[e.target.name] : e.target.value
	});

	const onSubmit = e => {
		e.preventDefault();
		console.log(company + location + githubusername + twitter + ' log');
		createProfile(formData, history, true);
	}

	return (
		<div className="edit-profile">
				<div className="about-container">
					<UploadAvatar/>
					<div class="about-container-col-1">
						<div class="about-row">
							<div className="about-col-1">
								<div className="about-content">
									<span className="about-name">{profile ? profile.user.name : null}</span>
								</div>
								<br/>
								<form onSubmit={e => onSubmit(e)}>
									<div className="form-container">
										<LocationOnIcon/>
										<input 
											type="text" 
											placeholder="location" 
											name="location"
											value={location}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<CodeIcon/>
										<input 
											type="text" 
											placeholder="Strongest Skill" 
											name="strongest_skill"
											value={strongest_skill}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text"
											placeholder="Company" 
											name="company"
											value={company}
											onChange={e => onChange(e)}
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="githubusername" 
											name="githubusername"
											value={githubusername}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="twitter" 
											name="twitter"
											value={twitter}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="facebook" 
											name="facebook"
											value={facebook}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="linkedin" 
											name="linkedin"
											value={linkedin}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="youtube" 
											name="youtube"
											value={youtube}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="form-container">
										<input 
											type="text" 
											placeholder="instagram" 
											name="instagram"
											value={instagram}
											onChange={e => onChange(e)} 
										/>
									</div>
									<div className="about-content"> 
										<ScheduleIcon className="about-icons"/>
										<span className="about-items">
											Joined on&nbsp;
											<Moment className="post-date" format="YYYY/MM/DD">
												{profile ? profile.date : <p>0/0/0</p>}
											</Moment>
										</span>
									</div>
									<button>Submit</button>
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
				<div className="about-container-col-2">
					asdasddaasd
				</div>
		</div> 
	);
}

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps, 
	{createProfile, getCurrentProfile}
)(withRouter(EditProfile));