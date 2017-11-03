import React from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import NotesPage from './containers/NotesPage';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';

const App = (props) =>
  <Router>
    <div>
      <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink style={{ marginRight: '10px' }} to="/notes">See All The Notes!</NavLink>
                <NavLink style={{ marginRight: '10px' }} to="/notes/new">Add A Note</NavLink>
                <NavLink style={{ marginRight: '10px' }} to="/">Home</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
      <Jumbotron>
          <Grid>
            <h1>
              <Route exact path="/" render={() => <h3>Welcome to the NBA News Feed App</h3>} />
              <Route path="/notes" component={NotesPage} />
            </h1>
            <p>
              <Button
                bsStyle="success"
                bsSize="large"
                href="http://www.nba.com/news"
                target="_blank">
                View News
              </Button>
            </p>
          </Grid>
        </Jumbotron>

    </div>
  </Router>;

export default App;
