import React from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBarSignedIn = props => {
  return (
    <Navbar inverse fixedTop collapseOnSelect>
        <Grid>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/news">
                  <NavItem eventKey={2}>News Feed</NavItem>
              </LinkContainer>
              <LinkContainer to="/notes">
                  <NavItem eventKey={3}>Favorited Stories and Notes</NavItem>
              </LinkContainer>
              <LinkContainer to="/signout">
                  <NavItem eventKey={4}>Sign Out</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

export default NavBarSignedIn;
