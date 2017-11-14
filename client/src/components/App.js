import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import NotesPage from '../containers/NotesPage';
import NewsPage from '../containers/NewsPage';
import { Grid, Jumbotron } from 'react-bootstrap';
import NavBar from './Navbar';
import Footer from './Footer';

const App = (props) =>
  <Router>
    <div>
    <NavBar />
      <Jumbotron>
          <Grid>
            <h2>
              <Route path="/notes" component={NotesPage} />
              <Route path="/news" component={NewsPage} />
              
            </h2>
            <h1>
              <Route exact path="/" render={() => <div><h2>Welcome to the Sports News Feed App</h2><p>This app pulls NBA, NFL, and other sports news, from ESPN, Fox Sports, and NFL News via NewsAPI. You can check a short description of the story and take notes as well. Links to the stories open in a new tab.</p><p><NavLink to="/news">See All News</NavLink></p><p><NavLink to="/notes">See All Notes</NavLink></p></div>} />
            </h1>
          </Grid>
      </Jumbotron>
      <Footer />
    </div>
  </Router>;

export default App;
