import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileItem = ({ profile: {
	user: {_id, name, avatar},
	status,
	company,
	location,
	skills
} }) => {
	return (
		<Fragment>
			<tr>
				<td className="td-no-border">
					top1
				</td>
				<td>
					<div className="rank-flex">
						<div className="rank-flex-col-1">
							<Link to={`/profile/${_id}`} className="btn btn-primary">
								<img src={avatar} alt="avatar" className="round-avatar"/>
							</Link>
						</div>
						<div className="rank-flex-col-2">
							<Link to={`/profile/${_id}`} className="btn btn-primary">
								<p>{name}</p>
							</Link>
						</div>
					</div>
				</td>
				<td>
					1
				</td>
				<td>
					2
				</td>
				<td>
					3
				</td>
				<td>
					3
				</td>
				<td>
					4
				</td>
			</tr>
		</Fragment>
	);
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
}

export default connect(null)(ProfileItem);