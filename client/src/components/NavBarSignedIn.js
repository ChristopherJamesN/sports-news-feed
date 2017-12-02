import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import SignOutLink from './auth/SignOutLink'

const NavBarSignedIn = props => {
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
                <NavLink to="/news">News Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/notes">Favorited Stories and Notes</NavLink>
              </NavItem>
              <NavItem>
                <SignOutLink />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

export default NavBarSignedIn;
