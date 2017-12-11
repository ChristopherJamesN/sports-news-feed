import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='dark' light>
        <Nav>
        <NavItem>
          <NavLink to='/'>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/news'>News Feed</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink to='/signin'>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signup'>Sign Up</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav>
            <NavItem>
              <NavLink to='/notes'>Saved Stories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout'>Sign Out</NavLink>
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
