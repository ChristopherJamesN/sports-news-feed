import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NotesPage from '../containers/NotesPage';
import NewsPage from '../containers/NewsPage';
import { Grid, Jumbotron } from 'react-bootstrap';
import NavBar from './Navbar';


const App = (props) =>
  <Router>
    <div>
    <NavBar />
      <Jumbotron>
          <Grid>
            <h1>
              <Route exact path="/" render={() => <h3>Welcome to the NBA News Feed App</h3> } />
              <Route path="/notes" component={NotesPage} />
              <Route path="/news" component={NewsPage} />
            </h1>
          </Grid>
      </Jumbotron>
    </div>
  </Router>;

export default App;
