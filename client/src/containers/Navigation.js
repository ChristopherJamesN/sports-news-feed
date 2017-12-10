import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='dark' light>
        <Nav>
        <NavItem>
          <NavLink href='/'>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/news'>News Feed</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink href='/signin'>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/signup'>Sign Up</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav>
            <NavItem>
              <NavLink href='/notes'>Saved Stories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/signout'>Sign Out</NavLink>
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
