import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import UserDropdown from '../components/UserDropdown';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='faded' light>
        <Nav className='d-inline-flex flex-row' navbar>
          <NavItem className='mr-5 mt-2'>
            <NavLink className='d-inline align-bottom' href='/news'>News Feed</NavLink>
          </NavItem>
          <NavItem className='ml-1 mr-3 mt-2'>
            {!this.props.isLoggedIn ? (
              <NavLink className='d-inline text-bottom' href='/login'>Login</NavLink>
             ) : (
              <UserDropdown className='mt-0'  />
             )}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn }
}

export default connect(mapStateToProps)(Navigation);
