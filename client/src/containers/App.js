import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import NotesPage from './NotesPage';
import NewsPage from './NewsPage';
import SignOutLink from '../components/auth/SignOutLink'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'
import { Grid, Jumbotron } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import PrivateRoute from '../components/PrivateRoute';
import { connect } from 'react-redux';
import { jwt } from '../actions'
import { bindActionCreators } from 'redux';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar loggedIn={this.props.user.isLoggedIn} />
          <Jumbotron>
              <Grid>
                <h2>
                  <PrivateRoute path="/notes" component={NotesPage} redirectTo="/" loggedIn={this.props.user.isLoggedIn} />
                  <Route path="/news" component={NewsPage} />
                  <PrivateRoute path="/signout" component={SignOutLink} redirectTo="/"  loggedIn={this.props.user.isLoggedIn}/>
                  <Route path="/signin" component={SignInForm} />
                  <Route path="/signup" component={SignUpForm} />
                </h2>
                <h1>
                  <Route exact path="/" render={() => <div><h2>Welcome to the Sports News Feed App</h2><p>This app pulls NBA, NFL, and other sports news, from ESPN, Fox Sports, and NFL News via NewsAPI. You can read a short description, favorite, and take notes on stories. Links to the stories open in a new tab. Sign in or sign up to favorite and take notes on stories.</p><h3><NavLink to="/news">News Feed</NavLink></h3></div>} />
                </h1>
              </Grid>
          </Jumbotron>
          <Footer />
        </div>
      </Router>
  )}
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    jwt: bindActionCreators(jwt, dispatch),
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
