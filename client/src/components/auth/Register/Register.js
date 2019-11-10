import React, { useState } from "react";
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { Link } from 'react-router-dom';
import { register } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LandingLogo from '../../../images/logo.png';

// forms
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

// Yup
const validationSchema = Yup.object().shape({
	name: Yup.string().min(8, "Must be 8 characters long").required(),
	email: Yup.string().email("Must be a valid email").required()
})

const Register = ({ setAlert, register, isAuthenticated }) => {
	// const [formData, setFormData] = useState({
	// 	name: '',
	// 	email: '',
	// 	password: '',
	// 	confirmpassword: ''
	// });

	// const { name, email, password, confirmpassword } = formData;

	// const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	// const onSubmit = async e => {
	// 	e.preventDefault();
	// 	if(password !== confirmpassword) {
	// 		setAlert('password didnt match', 'danger');
	// 	} else {
	// 		register({ name, email, password });
	// 	}
	// }

	//Redirect if logged in
	// if(isAuthenticated) {
	// 	return <Redirect to="/posts" />
	// }

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
				<Formik 
					initialValues={{name: '', email: '', password: '', confirmpassword: ''}}
					onSubmit={({setSubmitting, name, email, password}) => {
						register({name, email, password});

						if(isAuthenticated) {
							return <Redirect to="/posts" />
						}
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
						<Form className="register-form">
							<Field 
								type="text"
								placeholder="Username"
								name="name"
								value={values.name}
								className={touched.name && errors.name ? "has-error" : null}
								onBlur={handleBlur}
								onChange={handleChange} 
							/>
							<br/>
							<Field 
								type="email" 
								placeholder="Email Address" 
								name="email" 
								value={values.email}
								className={touched.email && errors.email ? "has-error" : null}
								onBlur={handleBlur}
								onChange={handleChange}  
							/>
							<br/>
							<Field 
								type="password" 
								placeholder="Password" 
								name="password" 
								value={values.password}
								className={touched.password && errors.password ? "has-error" : null}
								onBlur={handleBlur}
								onChange={handleChange} 
							/>
							<br/>
							<Field 
								type="password" 
								placeholder="Confirm Password" 
								name="confirmpassword" 
								value={values.confirmpassword}
								className={touched.confirmpassword && errors.confirmpassword ? "has-error" : null}
								onBlur={handleBlur}
								onChange={handleChange}  
							/>
							<button className="register-btn" disabled={isSubmitting}>Sign Up</button>
							{isSubmitting ? "please wait" : "submit"}
							<Link to="/login"><button className="register-login-btn">Sign In</button></Link>
						</Form>
					)}
				</Formik>
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
