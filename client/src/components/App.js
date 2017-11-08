import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
              <Route exact path="/" render={() => <h3>Welcome to the Sports News Feed App</h3> } />
            </h1>
          </Grid>
      </Jumbotron>
      <Footer />
    </div>
  </Router>;

export default App;
