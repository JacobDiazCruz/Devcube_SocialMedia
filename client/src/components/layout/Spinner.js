import React, { Fragment } from 'react';
import loadingSpinner from '../../images/spinner.gif';

export default () => (
	<Fragment>
		<img 
			src={loadingSpinner}
			style={{ width: '300px', margin: 'auto', display: 'block'}}
			alt="Loading..."
		/>
	</Fragment>
);