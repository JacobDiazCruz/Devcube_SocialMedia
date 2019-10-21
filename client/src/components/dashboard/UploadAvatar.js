import React, { useState, useEffect } from 'react';
import { uploadAvatar } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'

const UploadAvatar = ({ uploadAvatar, auth: {user} }) => {

	const handleEditPicture = () => {
		const fileInput = document.getElementById('img-input');
		fileInput.click();
	};

	const imageChange = e => {
		// submit image
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append('image', image);
		uploadAvatar(formData);
	};

	return (
		<div className="avatar-container">
			{user && 
				<img 
					src={user.avatar} 
					onClick={handleEditPicture} 
					className="round-avatar-md"
				/> 
			}
			<input
				type="file"
				id="img-input"
				hidden="hidden"
				placeholder="Write something..."
				name="image"
				className="create-post-input"
				onChange={imageChange}
			/>
		</div>
	);
};

UploadAvatar.propTypes = {
	uploadAvatar: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});	

export default connect(
	mapStateToProps,
	{uploadAvatar}
)(UploadAvatar);