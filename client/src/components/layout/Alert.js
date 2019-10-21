import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
	alerts != null && alerts.length > 0 && alerts.map(alert => (
		<div key={alert.id} className={`alert alert-${alert.alertType}`}>
			{alert.msg}
		</div>
	));

Alert.PropTypes = {
	alerts: PropTypes.array.isRequired
}

// mapping the new data to redux state "alert"
// this is referenced inside reducers index.js "alert"
const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);