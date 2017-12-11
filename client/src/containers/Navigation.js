import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='dark' light>
        <Nav>
        <li>
          <NavLink to='/'>&nbsp; Home &nbsp;</NavLink>
        </li>
        <NavItem>
          <NavLink to='/news'>&nbsp; News Feed &nbsp;</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink to='/signin'>&nbsp; Login &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signup'>&nbsp; Sign Up &nbsp;</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav>
            <NavItem>
              <NavLink to='/notes'>&nbsp; Saved Stories &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout'>&nbsp; Sign Out &nbsp;</NavLink>
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
