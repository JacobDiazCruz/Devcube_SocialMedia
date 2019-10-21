import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfiles, getProfileById } from '../../actions/profile';
import ProfileItem from './ProfileItem';


const Profiles = ({ 
	getProfiles, 
	profile: { profiles, loading }
}) => {
	useEffect(()=> {
		getProfiles();
	}, [getProfileById, getProfiles]);

	return (
		<section className="ranking-page">
			<div className="ranking-page-col-1">
			{ loading ? <Spinner/> : 
				<Fragment>
					<h1>Ranking</h1>
					<p>Top Rankings this week</p>
					<div>
						<table width="900" className="ranking-table">
							<tbody>
								<tr className="table-header">
									<td className="td-no-border">
										<p>Rank</p>
									</td>
									<td>
										<p>Player</p>
									</td>
									<td>
										<p>Win</p>
									</td>
									<td>
										<p>Lose</p>
									</td>
									<td>
										<p>Reputation</p>
									</td> <td>
										<p>Trophy</p>
									</td>
									<td>
										<p>Last Month</p>
									</td>
								</tr>
								{profiles.length > 0 ? (
									profiles.map(profile => (
										<ProfileItem key={profile._id} profile={profile} />
									))
								) : <h4>No profiles found</h4>}
							</tbody>
						</table>
					</div>
				</Fragment>
			}
			</div>

			<div className="ranking-page-col-2">
				<div className="top-bet">
					<div className="top-bet-header">
						<p>Top better of the Month</p>
					</div>
				</div>
			</div>
		</section>
	);
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
});	

export default connect(
	mapStateToProps,
 	{ getProfiles }
)(Profiles);