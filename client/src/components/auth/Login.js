import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

// oauth
import GoogleLogin from 'react-google-login';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};

	// google login
	function responseGoogle(res) {
		console.log('responseGoogle', res);
	};

	//Redirect if logged in
	if(isAuthenticated) {
		return <Redirect to="/posts" />
	}

	return (
		<div className="login-page">
			<div className="login-container">
				<h1 className="login-title">Sign In</h1><br/>
				<form className="login-form" onSubmit={e => onSubmit(e)}>
					<input 
						type="email"
						placeholder="Enter Email Address" 
						name="email"
						value={email}
						className="login-input"
						onChange={e => onChange (e)}  
					/>
					<br/>
					<input 
						type="password" 
						placeholder="Enter Password" 
						name="password" 
						value={password}
						className="login-input"
						onChange={e => onChange (e)}  
					/>
					<br/>
					<button className="login-btn">Sign In</button>
					<br/>
					
					<GoogleLogin
						clientId="1092221046085-5qqgbr2bh2kfaspt7mdnl10bbticch85.apps.googleusercontent.com"
						buttonText="Google"
					>Google</GoogleLogin>

					<br/><br/>
					<Link to="/" className="register-redirect">
						Don't have an account yet? Sign up here
					</Link>
				</form>
			</div>
		</div>
	)
};


Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);