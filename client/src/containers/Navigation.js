import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

  render() {
    return (
      <Navbar color='faded' light expand="md">
        <Nav>
        <li>
          <NavLink to='/' style={{ textDecoration: 'none' }}>&nbsp; Home &nbsp;</NavLink>
        </li>
        <NavItem>
          <NavLink to='/news' style={{ textDecoration: 'none' }}>&nbsp; News Feed &nbsp;</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink to='/signin' style={{ textDecoration: 'none' }}>&nbsp; Login &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signup' style={{ textDecoration: 'none' }}>&nbsp; Sign Up &nbsp;</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav>
            <NavItem>
              <NavLink to='/notes' style={{ textDecoration: 'none' }}>&nbsp; Saved Stories &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout' style={{ textDecoration: 'none' }}>&nbsp; Sign Out &nbsp;</NavLink>
            </NavItem>
          </Nav>
          )}

        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn }
}

export default connect(mapStateToProps)(Navigation);
