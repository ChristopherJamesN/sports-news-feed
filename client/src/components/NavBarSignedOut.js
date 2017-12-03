import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBarSignedOut = props => {
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
              <LinkContainer to="/signin">
                  <NavItem eventKey={2}>Sign In</NavItem>
              </LinkContainer>
              <LinkContainer to="/signup">
                  <NavItem eventKey={3}>Sign Up</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      </Grid>
    </Navbar>
  );
}

export default NavBarSignedOut;
