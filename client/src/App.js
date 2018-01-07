import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NotesPage from './containers/NotesPage';
import NewsPage from './containers/NewsPage';
import SignOutLink from './components/auth/SignOutLink';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import Homepage from './containers/Homepage';
import Navigation from './containers/Navigation';
import Footer from './components/Footer';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="Nav-home">
        <Navigation />
          <div className="App">
            <Route path="/notes" component={(
              this.props.isLoggedIn === true
                ? NotesPage
                : SignInForm
            )} />
            <Route path="/news" component={NewsPage} />
            <Route path="/signout" component={SignOutLink} />
            <Route path="/signin" component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route exact path="/" component={Homepage} />
            <br></br>
            <Footer />
          </div>
        </div>
      </Router>
  )}
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn
  };
}

export default connect(mapStateToProps)(App);
