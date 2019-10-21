import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CodeIcon from '@material-ui/icons/Code';
import ScheduleIcon from '@material-ui/icons/Schedule';

// Edit icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'

const ProfileTop = ({ 
	profile: {
		location,
		strongest_skill,
		date,
		user: { _id, name, avatar }
	},
	user,
	auth
}) => {

	const handleEditPicture = () => {
		const fileInput = document.getElementById('edit-profile');
		fileInput.click();
	};
	
	return (
		<div className="individual-profile-container">
			<div className="avatar-container">
				{avatar && <img src={avatar} className="round-avatar-md" /> }
			</div>
			<div class="about-row">
				<div className="about-col-1">
					<div className="about-content">
						<span className="about-name">{name ? name : null}</span>
					</div><br/>
					<div className="about-content">
						<LocationOnIcon className="about-icons"/>
						<span className="about-items">{location ? location : null}</span>
					</div>
					<div className="about-content"> 
						<CodeIcon className="about-icons"/>
						<span className="about-items">{strongest_skill ? strongest_skill : null}</span>
					</div>
					<div className="about-content"> 
						<ScheduleIcon className="about-icons"/>
						<span className="about-items">
							Joined on&nbsp;
							<Moment className="post-date" format="YYYY/MM/DD">
								{date ? date : null}
							</Moment>
						</span>
					</div>
				</div>
				<div className="about-col-2">
					{auth.isAuthenticated && auth.loading === false && auth.user._id === _id && 
						<Fragment>
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
						</Fragment>
					}
				</div>
			</div>
		</div>
	);
}

export default connect(
	null,
	{}
)(ProfileTop);