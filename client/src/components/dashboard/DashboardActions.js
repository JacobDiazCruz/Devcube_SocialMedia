import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
	return(
		<div>
			<Link to="/edit-profile" className="profile-btn">Edit Profile</Link>
			<Link to="/add-experience" className="profile-btn">Add Experience</Link>
			<Link to="/add-education" className="profile-btn">Add Education</Link>
		</div>
	);
}

export default DashboardActions;