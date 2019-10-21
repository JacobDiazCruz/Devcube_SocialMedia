import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getPost, addLike, removeLike, deletePost } from '../../actions/post';

import { makeStyles } from '@material-ui/core/styles';
import { blue, red, white, grey } from '@material-ui/core/colors';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';

const PostItem = ({
	deletePost,
	addLike,
	removeLike,
	profile,
	auth, 
	post: { _id, text, name, avatar, user, likes, comments, date },
	showActions
}) => {

	const [open, setOpen] = React.useState(false);

	const useStyles = makeStyles(theme => ({
	  root: {
	    display: 'flex',
	    justifyContent: 'center',
	    alignItems: 'flex-end',
	    position: 'relative'
	  },
	  paper: {
    	position: 'absolute',
    	top: 80,
    	right: 0,
    	left: 0,
    	width: 100,
  	  },
  	  fake: {
    	backgroundColor: grey[200],
    	height: theme.spacing(1),
  	  },
	  icon: {
	  	cursor: 'pointer'
	  },
	  iconHover: {
	  	'marginRight': '0.6em',
	    '&:hover': {
	      color: red[800],
	      cursor: 'pointer'
	    },
	  },
	}));

	const classes = useStyles();

	function LikeIcon (props) {
		return (
			<SvgIcon {...props}>
				<path fill="#5a4878" d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
			</SvgIcon>
		);
	};

	function UnlikeIcon (props) {
		return (
			<SvgIcon {...props}>
				<path fill="#5a4878" d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z" />
			</SvgIcon>
		);
	};

	function SettingsIcon (props) {
		return (
			<SvgIcon {...props}>
				<path fill="#fff" d="M7,22H9V24H7V22M11,22H13V24H11V22M15,22H17V24H15V22Z" />
			</SvgIcon>
		);
	}

	const handleClick = () => {
    	setOpen(prev => !prev);
	};

	const handleClickAway = () => {
	    setOpen(false);
	};

	return (
		<div className="post-box">
			<div className="post-row-1">
				<div className="post-left">
					<Link to={`/profile/${user}`} className="post-name">
						<img src={avatar} className="round-avatar"/>
					</Link>
				</div>

				<div className="post-middle">
					<Link to={`/profile/${user}`} className="post-name">
						<h2 className="post-name">{name}</h2>
					</Link>
				</div>

				<div className="post-right">
					{ showActions && <Fragment>
						{!auth.loading && user === auth.user._id && (
							<ClickAwayListener onClickAway={handleClickAway}>
							    <div>
							        <SettingsIcon onClick={handleClick} style={{ fontSize: 30 }}/>
							        {open ? (
							            <Paper className={classes.paper}>
							              	<p onClick={e => deletePost(_id)}>
												Delete Post
											</p>
							            </Paper>
							        ) : null}
							    </div>
							</ClickAwayListener>
						)}
					</Fragment>}
				</div>
			</div>

			<div className="post-row-2">
				<p className="post-content">{text}</p>
				<Moment className="post-date" format="YYYY/MM/DD">{date}</Moment>
				<br/><br/>

				{ showActions && 
					<Fragment>
						<LikeIcon 
							className={classes.iconHover} 
							onClick={e => addLike(_id)} 
							color="error" 
							style={{ fontSize: 22 }} 
						/>
						<UnlikeIcon 
							className={classes.iconHover} 
							onClick={e => removeLike(_id)} 
							color="error" 
							style={{ fontSize: 22}}
						/>
						<Link to={`/posts/${_id}`} className="view-comments">
							View Comments&nbsp;
							{ comments.length > 0 && (<span>({comments.length})</span>)}
						</Link>
					</Fragment>
				}
			</div>

		</div>
	);
}

PostItem.defaultProps = {
	showActions: true
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps, 
	{ addLike, removeLike, deletePost }
)(PostItem);