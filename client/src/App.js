import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import NotesPage from './containers/NotesPage';
import NewsPage from './containers/NewsPage';
import SignOutLink from './components/auth/SignOutLink'
import SignInForm from './components/auth/SignInForm'
import SignUpForm from './components/auth/SignUpForm'
import { Grid, Jumbotron } from 'react-bootstrap';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Jumbotron>
              <Grid>
                <h2>
                  <Route path="/notes" component={NotesPage} />
                  <Route path="/news" component={NewsPage} />
                  <Route path="/signout" component={SignOutLink} />
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

export default App;
