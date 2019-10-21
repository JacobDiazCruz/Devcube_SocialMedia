import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register/Register';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileContainer from './components/profile-forms/ProfileContainer';
import IndividualProfile from './components/individualProfile/ParentProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/ranking/Profiles';
import ParentProfile from './components/individualProfile/ParentProfile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import './App.css';

// load on the dom
import { 
  likesNotification,
  commentsNotification 
} from './actions/notification';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={IndividualProfile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={ProfileContainer} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
