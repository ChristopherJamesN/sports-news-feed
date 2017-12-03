import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
              <LinkContainer to="/news">
                  <NavItem eventKey={1}>News Feed</NavItem>
              </LinkContainer>
              <LinkContainer to="/notes">
                  <NavItem eventKey={2}>Favorited Stories and Notes</NavItem>
              </LinkContainer>
              <LinkContainer to="/signout">
                  <NavItem>Sign Out</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

export default NavBarSignedIn;
