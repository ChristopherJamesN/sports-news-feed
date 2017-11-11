import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = props => {
  return (
    <Navbar inverse fixedTop collapseOnSelect>
        <Grid>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink style={{ marginRight: '10px' }} to="/">Home</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <NavLink to="/news">See All News</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/notes">See All Notes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/notes/new">Add a Note</NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

export default NavBar;
