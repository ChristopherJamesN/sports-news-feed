import React from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import NotesPage from './containers/NotesPage';

const App = (props) =>
  <Router>
    <div>
      <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
        <NavLink style={{ marginRight: '10px' }} to="/notes">See All The Notes!</NavLink>
        <NavLink style={{ marginRight: '10px' }} to="/notes/new">Add A Note</NavLink>
      </div>
      <Route exact path="/" render={() => <h3>Welcome to the NBA News Feed App</h3>} />
      <Route path="/notes" component={NotesPage} />
    </div>
  </Router>;

export default App;
