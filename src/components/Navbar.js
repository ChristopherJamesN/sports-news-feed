import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Navbar } from 'react-bootstrap';

const NavBar = props => {
  return (
    <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink style={{ marginRight: '10px' }} to="/notes">See All Notes</NavLink>
              <NavLink style={{ marginRight: '10px' }} to="/notes/new">Add a Note</NavLink>
              <NavLink style={{ marginRight: '10px' }} to="/">Home</NavLink>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Grid>
    </Navbar>
  );
}

export default NavBar;
