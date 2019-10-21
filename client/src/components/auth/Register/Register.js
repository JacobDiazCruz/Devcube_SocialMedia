import React, { useState } from "react";
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { Link } from 'react-router-dom';
import { register } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LandingLogo from '../../../images/logo.png';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmpassword: ''
	});

	const { name, email, password, confirmpassword } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if(password !== confirmpassword) {
			setAlert('password didnt match', 'danger');
		} else {
			register({ name, email, password });
		}
	}

	//Redirect if logged in
	if(isAuthenticated) {
		return <Redirect to="/posts" />
	}

	return (
		<div className="register-page">
			<div className="register-col-1">
				<img src={LandingLogo} className="landing-logo" />
				<p className="landing-text">
					Become a Part of the DevCube Team
				</p>
			</div>
			<div className="register-col-2">
				<h1 className="register-title">Sign Up Now</h1>
				<form className="register-form" onSubmit={e => onSubmit(e)}>
					<input 
						type="text" 
						placeholder="Username"
						name="name"
						value={name}
						className="register-input"
						onChange={e => onChange(e)} 
					/>
					<br/>
					<input 
						type="email" 
						placeholder="Email Address" 
						name="email" 
						value={email}
						className="register-input"
						onChange={e => onChange(e)}  
					/>
					<br/>
					<input 
						type="password" 
						placeholder="Password" 
						name="password" 
						value={password}
						className="register-input"
						onChange={e => onChange(e)}  
					/>
					<br/>
					<input 
						type="password" 
						placeholder="Confirm Password" 
						name="confirmpassword" 
						value={confirmpassword}
						className="register-input"
						onChange={e => onChange(e)}  
					/>
					<button className="register-btn">Sign Up</button>
					<Link to="/login"><button className="register-login-btn">Sign In</button></Link>
				</form>
			</div>
		</div>
	)
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);